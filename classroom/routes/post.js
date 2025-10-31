const express = require("express");
const router = express.Router();
router.get("/",(req,res)=>{
    res.send("Get for post");
});

router.get("/:id",(req,res)=>{
  res.send("Get for show post");
});

router.post("/",(req,res)=>{
    res.send("POST for post");
});

router.get("/:id",(req,res)=>{
    res.send("DELETE for post id");
})

module.exports = router;