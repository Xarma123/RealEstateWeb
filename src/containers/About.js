import React, { useState, useEffect, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import House from '../assets/images/house.jpg';

const About = () => {
    const [topSeller, setTopSeller] = useState([]);
    const [realtors, setRealtors] = useState([]);

    useEffect(() => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const getTopSeller = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/realtors/topseller', config);
                setTopSeller(res.data);
            }
            catch (err) {

            }
        };

        getTopSeller();
    }, []);

    useEffect(() => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const getRealtors = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/realtors/', config);
                setRealtors(res.data);
            }
            catch (err) {

            }
        };

        getRealtors();
    }, []);

    const getAllRealtors = () => {
        let allRealtors = [];
        let results = [];

        realtors.map(realtor => {
            return allRealtors.push(
                <Fragment key={realtor.id}>
                    <div className='about__display'>
                        <img className='about__display__image' src={realtor.photo} alt='' />
                    </div>
                    <h3 className='about__realtor'>{realtor.name}</h3>
                    <p className='about__contact'>{realtor.phone}</p>
                    <p className='about__contact'>{realtor.email}</p>
                    <p className='about__about'>{realtor.description}</p>
                </Fragment>
            );
        });

        for (let i = 0; i < realtors.length; i += 3) {
            results.push(
                <div key={i} className='row'>
                    <div className='col-1-of-3'>
                        {allRealtors[i]}
                    </div>
                    <div className='col-1-of-3'>
                        {allRealtors[i+1] ? allRealtors[i+1] : null}
                    </div>
                    <div className='col-1-of-3'>
                        {allRealtors[i+2] ? allRealtors[i+2] : null}
                    </div>
                </div>
            );
        }

        return results;
    };  

    const getTopSeller = () => {
        let result = [];

        topSeller.map(seller => {
            return result.push(
                <Fragment key={seller.id}>
                    <div className='about__display'>
                        <img className='about__display__image' src={seller.photo} alt='' />
                    </div>
                    <h3 className='about__topseller'>Top Seller:</h3>
                    <p className='about__realtor'>{seller.name}</p>
                    <p className='about__contact'>{seller.phone}</p>
                    <p className='about__contact'>{seller.email}</p>
                    <p className='about__about'>{seller.description}</p>
                </Fragment>
            );
        });

        return result;
    };

    return (
        <main className='about'>
            <Helmet>
                <title>Realest Estate - About</title>
                <meta
                    name='description'
                    content='About us'
                />
            </Helmet>
            <header className='about__header'>
                <h1 className='about__heading'>About Realest Estate</h1>
            </header>
            <section className='about__info'>
                <div className='row'>
                    <div className='col-3-of-4'>
                        <h2 className='about__subheading'>We find the perfect home for you</h2>
                        <p className='about__paragraph'>
                        Real Estate is the leading real estate and rental marketplace. The website manages a database of more than 110 million U.S. homes, including homes for sale, homes for rent and homes not currently on the market, as well as home values, Rent now and also get other home-related information. The website is visited by a record 44.19 million visitors yearly.
                        
                        </p>    
                        <div className='about__display'>
                            <img className='about__display__image' src={House} alt='' />
                        </div>
                        <p className='about__paragraph'>
                        Become a part of the growing family. As a promise to our real-estate agent community, all our listings are completely free & always will be. Now you can grow your business happily. Further more, over a million buyers visit us every month, giving you the audience that you need. Download our seller app to avail all these benefits & conveniently follow up with your clients.
                        </p>
                    </div>
                    <div className='col-1-of-4'>
                        {getTopSeller()}
                    </div>
                </div>
            </section>
            <section className='about__team'>
                <div className='row'>
                    <h2 className='about__subheading'>Meet out awesome team!</h2>
                </div>
                {getAllRealtors()}
            </section>
        </main>
    );
};

export default About;