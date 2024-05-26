// import React from 'react'
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Row, Col  } from 'react-bootstrap';
import Cardss from './Cardss'
import { Link , useNavigate } from 'react-router-dom'
import Footer from './Footer';
import styled from 'styled-components';


const Separator = styled.hr`
  border: none;
  border-top: 5px solid #333;
  margin: 20px 0;
`;

const CenteredDiv = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const Ho = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);


  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('/api/book');
        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();

    return () => {
      
    };
  }, []);

  console.log(bookings);


  const handleView = async (id) => {
    let data;

    try {
        const response = await fetch(`/api/book/one/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            data = await response.json();
            console.log("Fetched Data:", data);

            
            navigate('/viewbook', { state: { data } });
        } else {
            console.error('Failed to fetch booking details');
        }
    } catch (error) {
        console.error('Error fetching booking details:', error);
    }
};

  const handalepay =()=>{
    console.log("Navigated to pay");
    navigate('/pay')
  }


  
  return (
    <>
    <div>
      <Cardss/>
    <div>

      
        <CenteredDiv>
            <h2>Available Books</h2>
        </CenteredDiv>
      <Separator />
     



<Row>
    {bookings.map(booking => (
        <Col key={booking._id} md={4}> {/* Assuming you want 3 bookings per row */}
            <Card style={{ marginBottom: '20px' }}>
                <Card.Img variant="top" src={booking.img} alt={booking.title} style={{ height: '250px', objectFit: 'cover' }} />
                <Card.Body>
                    <Card.Title>{booking.title}</Card.Title>
                    <Card.Text>
                        <strong>Author:</strong>{booking.author}<br />
                        <strong>Description:</strong> {booking.desc}<br />
                        <strong>Price: ₹</strong> {booking.price}<br />
                    </Card.Text>
                  

                    <div className="d-flex">
                        <Button variant="primary" onClick={()=> handalepay()} className="me-2">Pay</Button>
                        <Link to='/viewbook'>
                        <Button variant="secondary" onClick={() => handleView(booking._id)}>View</Button>
                        </Link>
                    </div>
                    
                    
                </Card.Body>
            </Card>
        </Col>
    ))}
</Row>

    </div>
    </div>
    
    </>
  )
}

export default Ho