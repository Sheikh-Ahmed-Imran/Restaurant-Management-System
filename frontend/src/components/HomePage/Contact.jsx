export function Contact() {
    return (
      <section className="flex justify-center items-center bg-gradient-to-r from-orange-50 to-orange-100 py-20 px-20 max-md:px-10 max-sm:px-5" id="contact">
        <div className="flex flex-col md:flex-row items-center justify-between gap-16 max-w-screen-xl w-full">
          <div className="flex flex-col gap-8 max-w-[500px]">
            <h2 className="text-4xl font-bold">Ready to Transform Your Restaurant?</h2>
            <p className="text-xl text-gray-600">
              Contact our team today to schedule a free demo and see how TasteBuds can revolutionize your operations.
            </p>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="#FF5722"/>
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Email Us</p>
                  <a href="mailto:hello@tastebuds.com" className="text-[#FF5722]">hello@tastebuds.com</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.23 15.26L16.69 14.97C16.08 14.9 15.48 15.11 15.05 15.54L13.21 17.38C10.38 15.94 8.06 13.63 6.62 10.79L8.47 8.94C8.9 8.51 9.11 7.91 9.04 7.3L8.75 4.78C8.63 3.77 7.78 3.01 6.76 3.01H5.03C3.9 3.01 2.96 3.95 3.03 5.08C3.56 13.62 10.39 20.44 18.92 20.97C20.05 21.04 20.99 20.1 20.99 18.97V17.24C21 16.23 20.24 15.38 19.23 15.26Z" fill="#FF5722"/>
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Call Us</p>
                  <a href="tel:+1-800-123-4567" className="text-[#FF5722]">+1-800-123-4567</a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full max-w-[500px] bg-white p-8 rounded-xl shadow-[0px_4px_6px_0px_rgba(0,0,0,0.10),0px_10px_15px_0px_rgba(0,0,0,0.10)]">
            <form className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="font-medium">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  placeholder="Your name" 
                  className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#FF5722] focus:border-transparent"
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-medium">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  placeholder="you@example.com" 
                  className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#FF5722] focus:border-transparent"
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label htmlFor="restaurant" className="font-medium">Restaurant Name</label>
                <input 
                  type="text" 
                  id="restaurant" 
                  placeholder="Your restaurant" 
                  className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#FF5722] focus:border-transparent"
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="font-medium">Message</label>
                <textarea 
                  id="message" 
                  rows={4} 
                  placeholder="How can we help you?" 
                  className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#FF5722] focus:border-transparent"
                />
              </div>
              
              <button type="submit" className="bg-[#FF5722] text-white py-3 px-6 rounded-full hover:bg-[#FF5722]/90 transition-colors font-medium">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  }
  