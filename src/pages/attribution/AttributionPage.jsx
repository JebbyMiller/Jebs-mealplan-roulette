import "./AttributionPage.css";
import { Link } from "react-router-dom";
import bgImage from "../../assets/marcos-paulo-prado-tcyW6Im5Uug-unsplash.jpg";

export default function AttributionPage() {
  return (
    <>
      <div className="app-bg" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="attribution-page">
          <Link to="/" className="menu-button">Back</Link>
          <br></br>
          <br></br>
          <h2>Image Attribution</h2>

          <div className="attribution-item">
            <p>
              Attributes Page Background: <br></br>Photo by<br></br>{" "}
              <a
                href="https://unsplash.com/@marcospradobr?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                target="_blank"
                rel="noopener noreferrer"
              >
                Marcos Paulo Prado
              </a>{" "}
              on{" "}
              <a
                href="https://unsplash.com/photos/unknown-person-writing-tcyW6Im5Uug?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
              >
                Unsplash
              </a>
            </p>
          </div>
          <div className="attribution-item">
            <p>
              Calendar Page Background: <br></br>Photo by<br></br>{" "}
              <a
                href="https://unsplash.com/@roadahead_2223?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                target="_blank"
                rel="noopener noreferrer"
              >
                Road Ahead
              </a>{" "}
              on{" "}
              <a
                href="https://unsplash.com/photos/a-close-up-of-a-calendar-on-a-table-r1CDF8HXgJY?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
              >
                Unsplash
              </a>
            </p>
          </div>
          <div className="attribution-item">
            <p>
              Filters Page Background: Photo by<br></br>{" "}
              <a
                href="https://unsplash.com/@zaibtse?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                target="_blank"
                rel="noopener noreferrer"
              >
                ZaiB Tse
              </a>{" "}
              on{" "}
              <a
                href="https://unsplash.com/photos/bunch-of-strawberries-KVv5lFOMY1E?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                target="_blank"
                rel="noopener noreferrer"
              >
                Unsplash
              </a>
            </p>
          </div>
          <div className="attribution-item">
            <p>
              Home Page Background: Photo by<br></br>{" "}
              <a
                href="https://unsplash.com/@annapelzer?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                target="_blank"
                rel="noopener noreferrer"
              >
                Anna Pelzer
              </a>{" "}
              on{" "}
              <a
                href="https://unsplash.com/photos/bowl-of-vegetable-salads-IGfIGP5ONV0?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                target="_blank"
                rel="noopener noreferrer"
              >
                Unsplash
              </a>
            </p>
          </div>
          <div className="attribution-item">
            <p>
              Login Page Background: Photo by<br></br>{" "}
              <a
                href="https://unsplash.com/@jkakaroto?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                target="_blank"
                rel="noopener noreferrer"
              >
                Jonas Kakaroto
              </a>{" "}
              on{" "}
              <a
                href="https://unsplash.com/photos/red-apple-fruit-beside-green-apple-and-yellow-fruit-on-brown-woven-basket-5JQH9Iqnm9o?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                target="_blank"
                rel="noopener noreferrer"
              >
                Unsplash
              </a>
            </p>
          </div>
          <div className="attribution-item">
            <p>
              Meal Options Background: Photo by<br></br>{" "}
              <a
                href="https://unsplash.com/@danielcgold?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                target="_blank"
                rel="noopener noreferrer"
              >
                Dan Gold
              </a>{" "}
              on{" "}
              <a
                href="https://unsplash.com/photos/macro-shot-of-vegetable-lot-4_jhDO54BYg?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                target="_blank"
                rel="noopener noreferrer"
              >
                Unsplash
              </a>
            </p>
          </div>
          <div className="attribution-item">
            <p>
              Roulette Page Background: Photo by<br></br>{" "}
              <a
                href="https://unsplash.com/@brice_cooper18?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                target="_blank"
                rel="noopener noreferrer"
              >
                Brice Cooper
              </a>{" "}
              on{" "}
              <a
                href="https://unsplash.com/photos/a-close-up-of-a-casino-rouleet-0x5DjnpHdBQ?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                rel="noopener noreferrer"
              >
                Unsplash
              </a>
            </p>
          </div>
          <div className="attribution-item">
            <p>
              Favicon: {" "}
              <a
                href="https://icons8.com/icon/69655/orange"
                target="_blank"
                rel="noopener noreferrer"
              >
                incons8
              </a>
            </p>
          </div>
          <div className="attribution-item">
            <p>
              Roulette Wheel Origin: {" "}
              <a
                href="https://www.freepik.com/free-vector/roulette-wheel-isolated_3948906.htm#fromView=keyword&page=1&position=0&uuid=b3ece0eb-1e3f-4ce4-bf45-feb651ee18c5&query=Roulette"
                target="_blank"
                rel="noopener noreferrer"
              >
                freepik
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
      