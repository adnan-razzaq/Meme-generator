import React, { useState, useEffect } from "react";
import "./meme.css";

export default function MemeGenerator() {
  // states
  const [toptext, settoptext] = useState("");
  const [bottomtext, setbottomtext] = useState("");
  const [randomimage, setrandomimage] = useState(
    "http://i.imgflip.com/1bij.jpg"
  );
  const [array, setarray] = useState([]);

  //functions
  const handletop = (e) => {
    settoptext(e.target.value);
    console.log(e.target.value);
  };
  const handlebottom = (e) => {
    setbottomtext(e.target.value);
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    const random = Math.floor(Math.random() * array.length);
    const randomimage = array[random];
    setrandomimage(randomimage);
  };
  //effect hook
  useEffect(() => {
    async function getdata() {
      const response = await fetch("https://api.imgflip.com/get_memes");
      const nextres = await response.json();
      return nextres;
    }
    getdata()
      .then((response) => {
        const { memes } = response.data;
        const images = memes.map((item) => {
          const { url } = item;

          return url;
        });
        setarray(images);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="main">
      <form onSubmit={handlesubmit}>
        <input
          type="text"
          name="toptext"
          value={toptext}
          onChange={handletop}
        />
        <input
          type="text"
          name="bottomtext"
          value={bottomtext}
          onChange={handlebottom}
        />
        <button>Generate</button>
      </form>
      <div className="meme">
        <img className="rand" src={randomimage} alt="rand" />
        <h2 className="top">{toptext}</h2>
        <h2 className="bottom">{bottomtext}</h2>
      </div>
    </div>
  );
}
