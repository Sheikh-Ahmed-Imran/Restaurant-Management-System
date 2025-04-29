import cloudinary from 'cloudinary';

cloudinary.v2.config({
    cloud_name: 'deuv7ybym',
    api_key:'837464684971458',
    api_secret: 'VEeRB8JvsOtPou5ylRnGujANyCk'
});
console.log(process.env.CLOUDINARY_CLOUD_NAME); 
export default cloudinary;