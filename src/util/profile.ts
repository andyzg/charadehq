import Cookies from 'js-cookie'

function makeid(length) {
   var result           = '';
   var characters       = 'abcdefghijklmnopqrstuvwxyz';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

let name = Cookies.get('name');
if (!name) {
  Cookies.set('name', makeid(8), { expires: 7 })
}

export default {
  getName: () => {
    return Cookies.get('name');
  }
}

