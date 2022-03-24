const User = require("../models/Users")
const { verifyToken, generateActivationCode } = require("../scripts/utils/helper")
const eventEmitter = require("../scripts/events/eventEmitter")

const createUser = async (data) => {
  try {
    const user = new User(data)
    user.active = false;
    const activationCode = generateActivationCode(user)
    const user1 = await user.save();
    eventEmitter.emit("send_email", {
      to: user.email,
      subject: "Hesap Aktivasyonu ✔",
      html: ` Hesabınızı aktif etmek için <a href="http://localhost:8080/verify/${activationCode}"> tıklanıyız </a>`,
    })
    return user1;
  } catch (err) {
    throw err;
  }
}

const modify = (where, data) => {
  return User.findOneAndUpdate(where, data, { new: true })
}

const verifyUser = async (activationCode) => {
  const userData = verifyToken(activationCode)
  const newDate = new Date();
  await User.findOneAndUpdate({ email: userData.email }, { active: true, activatedDate: newDate }, { new: true })
}

const getHowUser = () => {
  const nowDate = new Date();
  const previousDate = new Date();
  previousDate.setDate(nowDate.getDate() - 1)
  const allData = User.aggregate([
    {
      "$match": {
        "activatedDate": {
          $gte: previousDate,
          $lt: nowDate
        }
      }
    },
    {
      "$group": {
        _id: null,
        Doğrulanmış: {
          $sum: {
            $cond: ["$active", 1, 0]
          }
        },
        Dogrulanmamış: {
          $sum: {
            $cond: ["$active", 0, 1]
          }
        }
      }
    },
    { $project: { _id: 0 } }

  ])
  return allData
}


module.exports = {
  createUser,
  modify,
  verifyUser,
  getHowUser
}