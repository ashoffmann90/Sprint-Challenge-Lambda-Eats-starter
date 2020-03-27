import React from "react";
import { Link, useHistory } from "react-router-dom";

function Home() {
//   const history = useHistory();
// //   console.log("history", history)

//   const gimmePizza = () => {
//     // console.log("Submitting...");
//     setTimeout(() => {
//       history.push("/pizza");
//     }, 500);
//   };
  return (
    <div>
      <Link to={'/pizza'}><img
        className="home-image"
        src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"
        alt="Pizza"
      />
      </Link>
      {/* <button onClick={gimmePizza}>Pizza me!</button> */}
    </div>
  );
}

export default Home;