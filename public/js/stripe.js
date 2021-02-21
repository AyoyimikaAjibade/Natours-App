import axios from 'axios';
import { showAlert } from './alerts';

export const bookTour = async (tourId) => {
  try {
    //1) Get checkout sessions from API
    const session = await axios(
      `http://127.0.0.1:8000/api/v1/bookings/checkout-session/${tourId}`
    );

    // 2) Create checkout form + charge credit card
    const stripe = Stripe(
      'pk_test_51IMaAMDe0kB2cfcB3sV7N9GoQFKnbvXOtYm2LiPH5WkhPC0Oqlwn30VNgtBNzQMs02xP16h1gxa5hOlv9RX2YnZW00uVVokpT6'
    );
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err.response.data.message);
  }
};
