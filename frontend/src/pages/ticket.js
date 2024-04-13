import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/TicketPage.css";
import { useParams } from "react-router-dom";
import FormatDateTime from "../components/date";

const TicketDetails = () => {
  const currentUrl = window.location.href;

  const pathParts = currentUrl.split("/");

  const seatInfo = pathParts[pathParts.length - 1];

  const seats = seatInfo.split(",");

  const { txnId, showId, seatss } = useParams();

  const [paymentData, setPaymentData] = useState(null);

  const [showDetails, setShowDetails] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const [theaterDetails, setTheaterDetails] = useState(null);

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const response = await axios.get(
          `/api/show/getShow/${paymentData.showId}`
        );
        setShowDetails(response.data);
      } catch (error) {
        console.error("Error fetching show details:", error);
      }
    };

    if (paymentData && paymentData.showId) {
      fetchShowDetails();
      console.log("Show loaded successfully...");
      console.log(showDetails);
    }
  }, [paymentData]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        console.log("here movie Id", showDetails[0].movie);
        const response = await axios.get(
          `/api/movie/getMoviebyId/${showDetails[0].movie}`
        );
        console.log("movie - ", response.data);
        setMovieDetails(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    if (showDetails) {
      fetchMovieDetails();
      console.log("Movie loaded successfully...");
      console.log(movieDetails);
    }
  }, [showDetails]);

  useEffect(() => {
    const fetchTheaterDetails = async () => {
      // if (showDetails && showDetails.theater) {
      try {
        const response = await axios.get(
          `/api/theater/getTheaterbyId/${showDetails[0].theater}`
        );
        setTheaterDetails(response.data);
      } catch (error) {
        console.error("Error fetching theater details:", error);
      }
      // }
    };
    if (showDetails) {
      fetchTheaterDetails();
    }
  }, [showDetails]);

  const fetchPaymentStatus = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4002/api/payment/status/${txnId}/${showId}/${seats}`
      );
      const paymentData = response.data;
      setPaymentData(paymentData);

      // Check the status after setting paymentData
      if (paymentData.status === "SUCCESS") {
        reserveSeats(seats); // Call reserveSeats if status is SUCCESS
      }
    } catch (error) {
      console.log("Error fetching payment status:", error.message);
    }
  };

  const reserveSeats = async (seats) => {
    try {
      for (var i = 0; i < seats.length; i++) {
        const response = await axios.patch(
          `/api/seat/patchseatsbyshowId/${showId}`,
          { showId, seatNumber: seats[i] }
        );
        // console.log("reserve seats response :- ",response.data);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchPaymentStatus();
  }, []);

  return (
    <div>
      {paymentData ? (
        <div>
          <div className="ticket-container">
            <h2>Tickets Booked Successfully !!</h2>
            <div className="ticket-details">
              <div className="Ticket-Row">
                  <p>Your Ticket</p>
            </div>
            <div className="inner-ticket">
            <div className="ticket-poster">
              {movieDetails && (
                <img src={movieDetails.posterImage} alt={movieDetails.title} />
              )}
            </div>
            <div >
              <h2>
                {/* <span className="detail-label">Movie Name :</span>{" "} */}
                {movieDetails ? (
                  movieDetails.title
                ) : (
                  <p>Loding movie Details...</p>
                )}
                <span>
                ({movieDetails ? (
                  movieDetails.category
                ) : (
                  <p>Loding movie Details...</p>
                )})
              </span>
              </h2>
              <span>
              {movieDetails ? (
                  movieDetails.languages
                ) : (
                  <p>Loding movie Details...</p>
                )}
              </span>
               , 
              <span>
              {movieDetails ? (
                  movieDetails.genre
                ) : (
                  <p>Loding movie Details...</p>
                )}
              </span>
              
              <p>
              <p>
                {/* <span className="detail-label">Show Time :</span>{" "} */}
                {showDetails ? (
                  
                FormatDateTime(showDetails[0].startTime)
                ) : (
                  <p>Loading...</p>
                )}
              </p>
                {/* <span className="detail-label">Theater Name :</span>{" "} */}
                {theaterDetails ? (
                    theaterDetails.theaterName
                ) : (
                  <p>Loding theater Details...</p>
                )}
              </p>
              <p>
                <span >Seats :</span>{" "}
                {paymentData.selectedSeats.join(", ")}
              </p>
               
            <p>
                <span >Ticket Id :</span>{" "}
                {paymentData._id}
              </p>
              
            </div>
            </div>
            {/* <p>Thank you for booking the tickets. Enjoy the show!</p> */}
             <div className="Ticket-Row">
              <p>
                <span>Total Amount:</span>{" "}
                {(paymentData.paymentAmount / 100).toFixed(2)} Rs
              </p>
              </div>
            </div>
            
            
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default TicketDetails;
