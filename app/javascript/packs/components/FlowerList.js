import React from "react";
import Media from "react-bootstrap/Media";
import { Link } from "react-router-dom";

function FlowerList() {
  return (
    <React.Fragment>
      <p>hello this is flower list</p>

      <ul className="list-unstyled">
        <Media as="li">
          <img
            width={64}
            height={64}
            className="mr-3"
            src="holder.js/64x64"
            alt="Generic placeholder"
          />
          <Media.Body>
            <h5>flower 1</h5>
            <p>
              Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
              scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum
              in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac
              nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
            </p>
          </Media.Body>
        </Media>

        <Media as="li">
          <img
            width={64}
            height={64}
            className="mr-3"
            src="holder.js/64x64"
            alt="Generic placeholder"
          />
          <Media.Body>
            <h5>flower 2</h5>
            <p>
              Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
              scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum
              in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac
              nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
            </p>
          </Media.Body>
        </Media>

        <Media as="li">
          <img
            width={64}
            height={64}
            className="mr-3"
            src="holder.js/64x64"
            alt="Generic placeholder"
          />
          <Media.Body>
            <h5>flower 3</h5>
            <p>
              Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
              scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum
              in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac
              nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
            </p>
          </Media.Body>
        </Media>
      </ul>
      <Link to="/newflowers">
        <button>Add a new flower to the list</button>
      </Link>      
    </React.Fragment>
  );
}

export default FlowerList;
