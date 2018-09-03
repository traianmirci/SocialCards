'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')

const UserSchema = new mongoose.Schema({
    name: String,
    email: {type: String, unique: true, lowercase: true},
    password: {type: String},
    signUpDate: {type: Date, default: Date.now()},
    lastLogin: Date,
    picture: String,
    biography: String,
    userUrl: String,
    occupation: { type: String},
    country: { type: String, enum: 
        ['Afganistán', 'Albania', 'Alemania', 'Andorra', 'Angola', 'Anguila', 'Antártida', 'Antigua y Barbuda', 'Antillas holandesas', 'Arabia Saudí', 'Argelia', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaiyán', 'Bahamas', 'Bahrein', 'Bangladesh', 'Barbados', 'Bélgica', 'Belice', 'Benín', 'Bermudas', 'Bhután', 'Bielorrusia', 'Birmania', 'Bolivia', 'Bosnia y Herzegovina', 'Botsuana', 'Brasil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Camboya', 'Camerún', 'Canadá', 'Chad', 'Chile', 'China', 'Chipre', 'Ciudad estado del Vaticano', 'Colombia', 'Comores', 'Congo', 'Corea', 'Corea del Norte', 'Costa del Marfíl', 'Costa Rica', 'Croacia', 'Cuba', 'Dinamarca', 'Djibouri', 'Dominica', 'Ecuador', 'Egipto', 'El Salvador', 'Emiratos Arabes Unidos', 'Eritrea', 'Eslovaquia', 'Eslovenia', 'España', 'Estados Unidos', 'Estonia', 'Etiopía', 'Filipinas', 'Finlandia', 'Francia', 'Gabón', 'Gambia', 'Georgia', 'Ghana', 'Gibraltar', 'Granada', 'Grecia', 'Groenlandia', 'Guadalupe', 'Guam', 'Guatemala', 'Guayana', 'Guayana francesa', 'Guinea', 'Guinea Ecuatorial', 'Guinea-Bissau', 'Haití', 'Holanda', 'Honduras', 'Hong Kong', 'Hungría', 'India', 'Indonesia', 'Irak', 'Irán', 'Irlanda', 'Isla Bouvet', 'Isla Christmas', 'Isla Heard e Islas McDonald', 'Islandia', 'Islas Caimán', 'Islas Cook', 'Islas de Cocos o Keeling', 'Islas Faroe', 'Islas Fiyi', 'Islas Malvinas Islas Falkland', 'Islas Marianas del norte', 'Islas Marshall', 'Islas menores de Estados Unidos', 'Islas Palau', 'Islas Salomón', 'Islas Tokelau', 'Islas Turks y Caicos', 'Islas Vírgenes EE.UU.', 'Islas Vírgenes Reino Unido', 'Israel', 'Italia', 'Jamaica', 'Japón', 'Jordania', 'Kazajistán', 'Kenia', 'Kirguizistán', 'Kiribati', 'Kuwait', 'Laos', 'Lesoto', 'Letonia', 'Líbano', 'Liberia', 'Libia', 'Liechtenstein', 'Lituania', 'Luxemburgo', 'Macao R. A. E', 'Madagascar', 'Malasia', 'Malawi', 'Maldivas', 'Malí', 'Malta', 'Marruecos', 'Martinica', 'Mauricio', 'Mauritania', 'Mayotte', 'México', 'Micronesia', 'Moldavia', 'Mónaco', 'Mongolia', 'Montserrat', 'Mozambique', 'Namibia', 'Nauru', 'Nepal', 'Nicaragua', 'Níger', 'Nigeria', 'Niue', 'Norfolk', 'Noruega', 'Nueva Caledonia', 'Nueva Zelanda', 'Omán', 'Panamá', 'Papua Nueva Guinea', 'Paquistán', 'Paraguay', 'Perú', 'Pitcairn', 'Polinesia francesa', 'Polonia', 'Portugal', 'Puerto Rico', 'Qatar', 'Reino Unido', 'República Centroafricana', 'República Checa', 'República de Sudáfrica', 'República Democrática del Congo Zaire', 'República Dominicana', 'Reunión', 'Ruanda', 'Rumania', 'Rusia', 'Samoa', 'Samoa occidental', 'San Kitts y Nevis', 'San Marino', 'San Pierre y Miquelon', 'San Vicente e Islas Granadinas', 'Santa Helena', 'Santa Lucía', 'Santo Tomé y Príncipe', 'Senegal', 'Serbia y Montenegro', 'Sychelles', 'Sierra Leona', 'Singapur', 'Siria', 'Somalia', 'Sri Lanka', 'Suazilandia', 'Sudán', 'Suecia', 'Suiza', 'Surinam', 'Svalbard', 'Tailandia', 'Taiwán', 'Tanzania', 'Tayikistán', 'Territorios británicos del océano Indico', 'Territorios franceses del sur', 'Timor Oriental', 'Togo', 'Tonga', 'Trinidad y Tobago', 'Túnez', 'Turkmenistán', 'Turquía', 'Tuvalu', 'Ucrania', 'Uganda', 'Uruguay', 'Uzbekistán', 'Vanuatu', 'Venezuela', 'Vietnam', 'Wallis y Futuna', 'Yemen', 'Zambia', 'Zimbabue']},
    instagramToken: String,
    twitterUsername: String,
    username: String,
    avatar: String,
    gravatar: String,
    header: String

})

UserSchema.pre('save', function(next){
    let user = this
    if(!user.isModified('password')) return next()

    bcrypt.genSalt(10,(err,salt)=>{
        if(err) return next(err)

        bcrypt.hash(user.password, salt, null,(err,hash)=>{
            if(err) return next(err)

            user.password = hash
            next()
        } )
    })
})

UserSchema.methods.gravatarFunction = function () {
    if (!this.email) return `https://gravatar.com/avatar/?s=200&d=retro`
  
    const md5 = crypto.createHash('md5').update(this.email).digest('hex')
    return `https://gravatar.com/avatar/${md5}?s=200&d=retro`
  }

module.exports = mongoose.model('User', UserSchema)