const httpStatus = require("http-status");
const { createUser, loginUser, modify, verifyUser, getHowUser } = require("../services/Users")
const { passwordToHash } = require("../scripts/utils/helper");
const eventEmitter = require("../scripts/events/eventEmitter")
const uuid = require("uuid")

const create = (req, res) => {
    req.body.password = passwordToHash(req.body.password)
    createUser(req.body).then((response) => {
        res.status(httpStatus.CREATED).send(response);
    }).catch((err) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    })
}

const resetPassword = (req, res) => {
    const new_password = uuid.v4()?.split("-")[0] || newDate().getTime()
    modify({ email: req.body.email }, { password: passwordToHash(new_password) })
        .then((updatedUser) => {
            if (!updatedUser) return res.status(httpStatus.NOT_FOUND).send({ error: "Böyle bir kullanıcı bulunamamaktadır." })
            eventEmitter.emit("send_email", {
                to: updatedUser.email,
                subject: "Şifre Sıfırlama ✔",
                html: `<b>Şifreniz sıfırlanmıştır.</b> <br/> <br/> Yeni Şifreniz: <b>${new_password}</b>`, 
            })
            res.status(httpStatus.OK).send({
                message: "Şifre sıfırlama için mail gönderildi."
            })
        })
        .catch(() => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: "Şifre sıfırlama sırasında bir hata oluştu." }))
}

const verify = (req, res) => {
    verifyUser(req.params.activationCode)
}

const howUser = (req, res) => {
    getHowUser().then((response) => {
        res.status(httpStatus.OK).send(response);
    }).catch((err) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    })
}

module.exports = {
    create,
    resetPassword,
    verify,
    howUser,
}