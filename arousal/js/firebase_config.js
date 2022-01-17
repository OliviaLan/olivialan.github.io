//用的时候要先去firestore注册一个新的app，然后粘过来
//同时还需要开通database和storage
//database里rule里，Change allow read, write: if false; to true;
//网页端console显示问题：换个浏览器safari试试

var firebaseConfig = {
    apiKey: "AIzaSyCRNey3IkLSxaaI6Ra0Dun70k5OWuKNbTA",
    authDomain: "flowflow-bdc7d.firebaseapp.com",
    databaseURL: "https://flowflow-bdc7d.firebaseio.com",
    projectId: "flowflow-bdc7d",
    storageBucket: "flowflow-bdc7d.appspot.com",
    messagingSenderId: "482398842104",
    appId: "1:482398842104:web:c5ef36a07a97bff6cfdf0d",
    measurementId: "G-TG7W1494PT"
};