import React from 'react';
import './style.scss';
import Button from '../Button/Button';
import Eyes from '../Eyes/Eyes';
import CircularText from '../CircularText/CircularText';

const HeroHome = () => {
    return (
        <section className='hero_home'>
            <div className='container_top_home'>
            <h2>design <i>your</i> story</h2>
                <div className='container_prices'>
                    <div className='container_offer'>
                        <div>
                            <span id='essential_plan'>$5/M</span>
                            <label htmlFor="essential plan">Essential plan</label>
                        </div>
                        <div>
                            <span id='advanced_plan'>$8/M</span>
                            <label htmlFor='advanced plan'>Advanced plan</label>
                        </div>
                    </div>
                    <p>You're <i>student</i> ? It's <i>only 1$</i> !</p>
                </div>
            </div>
            <div className='container_bottom_home'>
                <div className='container_button'>
                    <Button text={'Get Started'} href={'/'} negatif={false}></Button>
                    <Button text={'Sites In Uses'} href={'/'} negatif={true}></Button>
                </div>
                <a className='container_eyes'>
                    <Eyes></Eyes>
                    <CircularText></CircularText>
                </a>
            </div>    
        </section>
    );
};

export default HeroHome;
