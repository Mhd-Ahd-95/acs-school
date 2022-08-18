import React from 'react';
import MainLayout from '../../../Layout/Main/MainLayout'
import {CarouselImages} from '../../../Components/UserComponents/body/body'


function BodyView() {

    const images = [
        {
            imgPath:
                '/images/image_home/acs3.jpeg',
        },
        {
            imgPath:
                '/images/image_home/acs5.jpeg',
        },
        {
            imgPath:
                '/images/image_home/acs6.png',
        },
        {
            imgPath:
                'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
        },
    ];

    return (
        <MainLayout
            title='Home Page'
            drawerActive='Home'
        >

            <CarouselImages 
                images={images}
            />

        </MainLayout>
    )
}

export default BodyView