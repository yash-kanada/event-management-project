import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';

const eventCategories = [
    {
        id: 'concerts',
        title: 'Concerts',
        image: '/images/music-event.jpg'
    },
    {
        id: 'sports',
        title: 'Sports',
        image: '/images/sports-event.jpg'
    },
    {
        id: 'festivals',
        title: 'Festivals',
        image: '/images/wedding-event.jpg'
    },
    {
        id: 'expos',
        title: 'Expos',
        image: '/images/tech-expo.jpg'
    },
    {
        id: 'parties',
        title: 'Parties',
        image: '/images/birthday-event.jpg'
    },
    {
        id: 'workshops',
        title: 'Workshops',
        image: '/images/business-event.jpg'
    }
];

function Gallery() {
    const navigate = useNavigate();

    return (
        <>
            <Header />

            <div style={{ position: 'relative', height: '75vh', overflow: 'hidden' }}>
                <img
                    src="/images/gallary-poster.jpg"
                    alt= "music event"
                    className="w-100 h-100 object-fit-cover"
                    style={{ filter: 'brightness(0.6)' }}
                    loading='lazy'
                />
                <div className="position-absolute top-50 start-50 translate-middle text-center px-3">
                    <h1 className="display-5 fw-bold">Event Categories</h1>
                    <p className="lead text-white-50">Browse by event type and find what suits your vibe.</p>
                </div>
            </div>


            <div className="container py-5">
                <div className="row g-4">
                    {eventCategories.map(category => (
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                            <div
                                className="card text-white border-0 shadow-lg overflow-hidden crsptr category-card"
                                onClick={() => navigate(`/gallary/${category.id}`)}
                            >
                                <img
                                    src={category.image}
                                    className="card-img object-fit-cover"
                                    alt={category.name}
                                    style={{ height: '220px', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                                />
                                <div className="card-img-overlay d-flex align-items-end p-0">
                                    <h5 className="bg-dark bg-opacity-75 w-100 m-0 text-center py-2 fw-bold">
                                        {category.title}
                                    </h5>
                                </div>
                            </div>
                        </div>

                    ))}
                </div>
            </div>

            <Footer />
        </>
    );
}

export default Gallery;
