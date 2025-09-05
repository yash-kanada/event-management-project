import React from 'react'
import { useParams } from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'

function GalleryDetail() {
    const { cat_id } = useParams()

    const galleryImages = {
        concerts: [
            { id: 1, src: '/images/music-event.jpg' }
        ],
        sports: [
            { id: 1, src: '/images/sports-event.jpg' },
            { id: 2, src: '/images/sports-event.jpg' },
            { id: 3, src: '/images/sports-event.jpg' },
            { id: 4, src: '/images/sports-event.jpg' },
        ],
        festivals: [
            { id: 1, src: '/images/wedding-event.jpg' },
        ],
        expos: [
            { id: 1, src: '/images/tech-expo.jpg' },
        ],
        parties: [
            { id: 1, src: '/images/birthday-event.jpg' },
        ],
        workshops: [
            { id: 1, src: '/images/business-event.jpg' },
        ]
    }


    const images = galleryImages[cat_id] || []

    return (
        <>
            <Header />

            <div style={{ position: 'relative', height: '75vh', overflow: 'hidden' }}>
                <img
                    src="/images/music-event.jpg"
                    alt="music event"
                    className="w-100 h-100 object-fit-cover"
                    style={{ filter: 'brightness(0.6)' }}
                />
                <div className="position-absolute top-50 start-50 translate-middle text-center px-3">
                    <h1 className="fw-bold text-uppercase">{cat_id} Events</h1>
                    <p className="text-white-50">Explore the best moments from our {cat_id} events</p>
                </div>
            </div>

            <div className="bg-dark text-white text-center py-5">

            </div>

            <section className="container py-5">
                <div className="row g-4">
                    {images.map((img) => (
                        <div key={img.id} className="col-6 col-md-4 col-lg-3">
                            <div className="card border-0 shadow overflow-hidden">
                                <img
                                    src={img.src}
                                    alt={`gallery-${img.id}`}
                                    className="w-100 h-100 object-fit-cover"
                                    style={{ height: '220px', objectFit: 'cover' }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </>
    )
}

export default GalleryDetail
