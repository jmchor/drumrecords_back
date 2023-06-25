const mongoose = require("mongoose");
const Record = require("../models/Record.model");

// Connection URL for MongoDB
const mongoURL = "mongodb://localhost:27017/drumrecords_back";

// Connect to MongoDB
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

const records = [
    {
      url: "https://www.instagram.com/reel/Cs_biBlAlJU/",
      artist: "miketerrana",
      category: "Paradiddles"
    },
    {
      url: "https://www.instagram.com/p/CtlEdrRRdnB/",
      artist: "michaljakubowskidrums",
      category: "Paradiddles"
    },
    {
      url: "https://www.instagram.com/reel/Cq30CHUJaFs/",
      artist: "thedrumcell",
      category: "Stick Tricks"
    },
    {
      url: "https://www.instagram.com/reel/CtJjLweMhqn/",
      artist: "originaldrummah",
      category: "Stick Tricks"
    },
    {
      url: "https://www.instagram.com/reel/CtO-sz_RFlX/",
      artist: "chontosdrumlessons",
      category: "Fills"
    },
    {
      url: "https://www.instagram.com/reel/CtbyzEmINz6/",
      artist: "sirosvaziri",
      category: "Fills"
    },
    {
      url: "https://www.instagram.com/reel/CtePgHgxFqa/",
      artist: "chontosdrumlessons",
      category: "Fills"
    },
    {
      url: "https://www.instagram.com/reel/CtY8yGvAqxu/",
      artist: "chontosdrumlessons",
      category: "Fills"
    },
    {
      url: "https://www.instagram.com/reel/CrL-sbctrtB/",
      artist: "drums2you",
      category: "Fills"
    },
    {
      url: "https://www.instagram.com/reel/CsWYSHnAex-/",
      artist: "stufagan",
      category: "Fills"
    },
    {
      url: "https://www.instagram.com/reel/CtmjKevNqSG/",
      artist: "mauricio.extremedrums",
      category: "Songs"
    },
    {
      url: "https://www.instagram.com/reel/CshlpaWgZf3/",
      artist: "gabrielfaromusic",
      category: "Songs"
    },
    {
      url: "https://www.instagram.com/reel/CszlJ9uApHo/",
      artist: "gabrielfaromusic",
      category: "Songs"
    },
    {
      url: "https://www.instagram.com/reel/CrWXU2OtdpO/",
      artist: "mauricio.extremedrums",
      category: "Songs"
    },
    {
      url: "https://www.instagram.com/reel/CtjYNDrOln7/",
      artist: "drummechanics",
      category: "Other"
    },
    {
      url: "https://www.instagram.com/p/Ctg_G9aNU_p/",
      artist: "davemajormusic",
      category: "Double Stroke Rolls"
    },
    {
      url: "https://www.instagram.com/p/CtUI1WwtFZZ/",
      artist: "davemajormusic",
      category: "Double Stroke Rolls"
    },
    {
      url: "https://www.instagram.com/p/CrlZiv8Mhm5/",
      artist: "davemajormusic",
      category: "Double Stroke Rolls"
    },
    {
      url: "https://www.instagram.com/reel/CsiqWOnAjNk/",
      artist: "miketerrana",
      category: "Double Stroke Rolls"
    },
    {
      url: "https://www.instagram.com/reel/CtgW98JNFkC/",
      artist: "drummer.gram",
      category: "Techniques"
    },
    {
      url: "https://www.instagram.com/reel/Csd0LrzPck7/",
      artist: "originaldrummah",
      category: "Techniques"
    },
    {
      url: "https://www.instagram.com/reel/CtPBWDbtSVY/",
      artist: "originaldrummah",
      category: "Techniques"
    }
  ];


  const seedRecords = async () => {
    try {
      // Clear existing records
      await Record.deleteMany();

      // Create new records
      await Record.create(records);

      console.log("Seed data inserted successfully!");
    } catch (error) {
      console.error("Error seeding data:", error);
    } finally {
      // Close the database connection
      db.close();
    }
  };

  // Seed the records
  seedRecords();