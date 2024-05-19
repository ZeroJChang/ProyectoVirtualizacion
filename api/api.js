// Importar los módulos necesarios
const express = require('express');
const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set } = require('firebase/database');
const { getFirestore, collection, addDoc } = require('firebase/firestore');
require('dotenv').config();

// Configuración de Firebase desde variables de entorno
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

// Inicializar Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Obtener una referencia a la base de datos de Firebase
const db = getDatabase();

// Obtener una referencia a Firestore
const firestore = getFirestore();

// Inicializar Express
const app = express();

// Middleware para configurar CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Ruta para obtener la hora y el nombre
app.get('/ObtenerHoraTico', async (req, res) => {
  try {
    const nombre = "Carlos Vargas";
    const hora = new Date().toLocaleTimeString();
    const data = {
      nombre: nombre,
      hora: hora,
      hello: "Hello-World!"
    };

    // Guardar los datos en Firestore
    const docRef = await addDoc(collection(firestore, "messages"), data);
    
    // Verificar si estamos en un entorno de navegador antes de enviar un evento de analytics
    if (typeof window !== 'undefined') {
      const { getAnalytics } = require('firebase/analytics');
      const analytics = getAnalytics(firebaseApp);
      await analytics.logEvent('select_content', {
        content_type: 'image',
        item_id: docRef.id
      });
    }

    res.json({ result: `Mensaje con ID: ${docRef.id} agregado.` });
  } catch (error) {
    console.error("Error al guardar los datos en Firestore:", error);
    res.status(500).json({ error: "Error al guardar los datos en Firestore" });
  }
});


app.get('/ObtenerHoraChang', async (req, res) => {
  try {
    const nombre = "Jose De León";
    const hora = new Date().toLocaleTimeString();
    const data = {
      nombre: nombre,
      hora: hora,
      hello: "Hello-World!"
    };

    // Guardar los datos en Firestore
    const docRef = await addDoc(collection(firestore, "messages"), data);
    
    // Verificar si estamos en un entorno de navegador antes de enviar un evento de analytics
    if (typeof window !== 'undefined') {
      const { getAnalytics } = require('firebase/analytics');
      const analytics = getAnalytics(firebaseApp);
      await analytics.logEvent('select_content', {
        content_type: 'image',
        item_id: docRef.id
      });
    }

    res.json({ result: `Mensaje con ID: ${docRef.id} agregado.` });
    console.log("Evento enviado correctamente a Firebase Analytics:", docRef.id);

  } catch (error) {
    console.error("Error al guardar los datos en Firestore:", error);
    res.status(500).json({ error: "Error al guardar los datos en Firestore" });
  }
});

// Puerto en el que escucha el servidor
const PORT = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor API escuchando en el puerto ${PORT}`);
});
