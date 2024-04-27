import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCompass,
  faPhone,
  faClock,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons"

export default function Footer() {
  return (
    <footer className="footer background-color-dark">
      <div className="container">
        <div className="footer__logo">Waves</div>
        <div className="footer__container">
          <div className="footer__container__left">
            <h2 className="footer__header">Contact information</h2>
            <div className="footer__business_nfo">
              <div className="footer__tag">
                <FontAwesomeIcon icon={faCompass} className="footer__icon" />
                <div className="footer__nfo">
                  <div>Address</div>
                  <div>Rudo</div>
                </div>
              </div>
              <div className="footer__tag">
                <FontAwesomeIcon icon={faPhone} className="footer__icon" />
                <div className="footer__nfo">
                  <div>Phone</div>
                  <div>(044) 558-52-96</div>
                </div>
              </div>
              <div className="footer__tag">
                <FontAwesomeIcon icon={faClock} className="footer__icon" />
                <div className="footer__nfo">
                  <div>Working hours</div>
                  <div>8:00 - 17:00</div>
                </div>
              </div>
              <div className="footer__tag">
                <FontAwesomeIcon icon={faEnvelope} className="footer__icon" />
                <div className="footer__nfo">
                  <div>Email</div>
                  <div>giguni@realno.net</div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer__container__right">
            <h2 className="footer__header">Be the first to know</h2>
            <div>
              Get all the latest information on events, sales and offers. You
              can miss out.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
