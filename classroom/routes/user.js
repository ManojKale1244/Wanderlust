const express = require("express");
const router = express.Router();
router.get("/",(req,res)=>{
    res.send("Get for users");
});

router.get("/:id",(req,res)=>{
  res.send("Get for show users");
});

router.post("/",(req,res)=>{
    res.send("POST for users");
});

router.delete("/:id",(req,res)=>{
    res.send("DELETE for users id");
});

module.exports = router;