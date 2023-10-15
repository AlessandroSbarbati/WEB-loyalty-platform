const { request, response } = require('express')
const dbconnection = require('../config/dbconnection')
const Card = require('../models/card')
const User = require('../models/user')

//METODO CREA CARTA UTENTE
exports.creaCartaEmp = (request, response) => {

    if (request.body.nome == "" || request.body.codice == "" || request.body.cognome == " " || request.body.punti == " ") {
        response.status(400).send({
            message: "dati assenti",
            status: 400
        })
    }

    const codice = request.body.codice
    const punti = request.body.punti
    const nome = request.body.nome
    const cognome = request.body.cognome

    User.findOne({
        where: {
            nome: nome,
            cognome: cognome

        }
    }).then(user => {
        if (user) {
            Card.findOne({
                where: {
                    idUtente: user.id


                }
            }).then(card => {
                if (card) {
                    response.status(402).send({
                        messaggio: "carta esistente",
                        status: 402
                    })

                } else {
                    Card.findOne({
                        where: {
                            codice: codice
                        }
                    }).then(card1 => {
                        if (card1) {
                            response.status(402).send({
                                messaggio: " codice già esistente",
                                status: 402
                            })
                        } else {
                            const card = {
                                idUtente: user.id,
                                codice: codice,
                                punti: punti
                            }

                            Card.create(card).then(data => {
                                response.status(201).send({
                                    status: 201,
                                    message: `carta creata con successo`
                                })
                            }).catch(err => {
                                response.status(500).send({
                                    status: 500,
                                    message: `errore creazione carta`,
                                });
                            });

                        }
                    })


                }

            }
            )

        } else {
            response.status(404).send({
                message: "utente inesistente",
                status: "404"

            })


        }
    })

}

//METODO PER ELMINARE CARTA UTENTE
exports.rimuoviCarta = async (request, response) => {


    const id = request.body.id

    const row = await Card.findOne({
        where: { id: id },
    });

    if (row) {
        console.log(" dentro")
        await row.destroy(); // deletes the row
        console.log("ho eliminato")
        response.status(200).send({
            messagge: "carta distrutta",
            status: 200
        })
    } else {
        response.status(404).send({
            message: "errore ",
            status: 404
        })
    }
}

//METODO PER VISUALIZZARE TUTTE LE CARTE
exports.prendiCarte = (request, response) => {

    Card.findAll({
        include: [{
            model: User,
            as: "proprietario",
            attributes: ["nome", "cognome"],

        }]
    }).then(risultato => {
        if (risultato) {
            response.status(200).send({
                message: "card trovate",
                risultato,
                status: 200
            })
        } else {
            response.status(404).send({
                message: " untenti non trovati",
                status: 404
            })
        }



    })
}

//METODO PER VISUALIZZARE 1 CARTA
exports.prendiCarta = (request, response) => {
    if (request.params.id == "") {
        response.status(400).send({
            message: "dati assenti",
            status: 400
        })
    }
    Card.findByPk(id).then(data => {
        if (data) {
            response.status(200).send({
                message: "card presa",
                data,
                status: 200
            })
        } else {
            response.status(402).send({
                message: "card non presa",
                status: 402
            })
        }
    })

};

//METODO PER VISUALIZZARE CARTA SINGOLA UTENTE TRAMITE ID 
exports.prendiCartaIdUtente = (request, response) => {
    if (request.params.id == "") {
        response.status(400).send({
            message: "dati assenti",
            status: 400
        })
    }
    Card.findOne({
        where: {
            idUtente: request.params.id

        }
    }).then(data => {
        if (data) {
            response.status(200).send({
                message: "card presa",
                data,
                status: 200
            })
        } else {
            response.status(402).send({
                message: "card non presa",
                status: 402
            })
        }
    })
}


//METODO PER AGGIUNGERE PUNTI ALLA CARTA
exports.aggiungiPunti = async (request, response) => {
    try {
        if (request.body.punti === "" || request.body.codice === "") {
            return response.status(400).send({
                message: "dati assenti",
                status: 400
            });
        }

        const codice = request.body.codice;
        const punti = parseInt(request.body.punti);

        const card = await Card.findOne({
            where: {
                codice: codice
            }
        });

        if (!card) {
            return response.status(404).send({
                message: "card inesistente",
                status: 404
            });
        }

        const puntiAttuali = card.punti;
        const puntiAggiornati = puntiAttuali + punti;

        await card.update({ punti: puntiAggiornati });

        return response.status(200).send({
            message: "punti aggiornati",
            status: 200
        });
    } catch (error) {
        console.error(error);
        return response.status(500).send({
            message: "Errore del server",
            status: 500
        });
    }
};

//METODO PER RIMUOVERE PUNTI DALLA CARTA
exports.rimuoviPunti = async (request, response) => {


    if (request.body.punti == "" || request.body.codice == "") {
        response.status(400).send({
            message: "dati assenti",
            status: 400
        })
    }

    const codice = request.body.codice
    const punti = request.body.punti


    Card.findOne({
        where: {

            codice: codice

        }
    }).then(async card => {
        if (card) {

            const puntiAttuali = parseInt(card.punti)
            const puntiAggiornati = puntiAttuali - punti

            card.set({ punti: puntiAggiornati })
            await card.save()

            response.status(200).send({
                message: "punti aggiornati",
                status: 200
            })

        }
        else {

            response.status(404).send({
                message: "card inesistente",
                status: "404"

            })
        }

    })
        .catch(err => {
            res.status(500).send({
                status: 500,
                message: `Could not delete Card with id=${id}`,
            });
        });
}
