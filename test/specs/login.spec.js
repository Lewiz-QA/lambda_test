const homeScreen = require("../screens/home.screen");
//const { login } = require("../screens/login.screen");
const loginScreen = require("../screens/login.screen");
const myStoreScreen = require("../screens/myStore.screen");

let usuario = 'gerente'
let senha = 'GD*peToHNJ1#c$sgk08EaYJQ'
let urlLoja = 'http://lojaebac.ebaconline.art.br/'

describe('Access Admin Panel', () => {
    it('should login with valid credentials', async () => {
        await homeScreen.goToLogin()
        await loginScreen.setStoreAddress(urlLoja)
        await loginScreen.continue()
        await loginScreen.continueWithStoreCredentials()
        await loginScreen.login(usuario,senha)
        await loginScreen.goToTwoFactorAuth()
        await loginScreen.twoFactorLogin(senha)

        expect(await myStoreScreen.myStoreLogoIsDisplayed()).toBeTruthy()
        expect(await myStoreScreen.getStoreName()).toEqual('EBAC - Shop')
    });
})