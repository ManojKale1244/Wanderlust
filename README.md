🌍 Wanderlust

Wanderlust is a full-stack web application inspired by Airbnb, built using Node.js, Express, MongoDB, and EJS.
It allows users to explore, create, and manage listings for unique travel destinations around the world.

🚀 Features

✅ User Authentication – Register, Login, and Logout using secure authentication.
✅ Create & Manage Listings – Users can add, edit, or delete their own property listings.
✅ Image Uploads – Upload photos using Cloudinary and Multer.
✅ Interactive Maps – Integrated Mapbox to display listing locations dynamically.
✅ Reviews & Ratings – Users can add and manage reviews for listings.
✅ Responsive Design – Works smoothly on mobile, tablet, and desktop devices.
✅ Flash Messages – Friendly feedback messages for user actions.

🧩 Tech Stack
Category	Technology
Frontend	EJS, Bootstrap, CSS
Backend	Node.js, Express.js
Database	MongoDB (Mongoose)
Authentication	Passport.js
Image Hosting	Cloudinary + Multer
Geocoding / Maps	Mapbox SDK
Validation	Joi
Flash & Sessions	connect-flash, express-session
⚙️ Installation

Follow these steps to run the project locally:

# 1️⃣ Clone the repository
git clone https://github.com/ManojKale1244/Wanderlust.git

# 2️⃣ Navigate into the project folder
cd Wanderlust

# 3️⃣ Install dependencies
npm install

# 5️⃣ Run the server
npm start


Server will start at 👉 http://localhost:8080

🗺️ Folder Structure
Wanderlust/
│
├── models/              # Mongoose schemas (Listing, Review, User)
├── routes/              # Express routes
├── controllers/         # Route controller logic
├── public/              # Static assets (CSS, JS, Images)
├── views/               # EJS templates
├── utils/               # Helper functions
├── cloudConfig.js       # Cloudinary configuration
├── app.js               # Main application file
└── .env                 # Environment variables

🤝 Contributing

Pull requests are welcome!
If you’d like to improve the project, feel free to fork it and submit a PR.

🧑‍💻 Author

Manoj Ramchandra Kale
📧 [manojkale187@gmail.com]
🌐 [https://github.com/ManojKale1244]

⭐ Acknowledgments

Special thanks to:

Colt Steele
 for his amazing Web Developer Bootcamp

Mapbox
 for map integration

Cloudinary
 for image storage
