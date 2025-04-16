export function Footer() {
    return (
      <footer className="flex justify-center border border-gray-100 bg-white px-20 max-md:px-10 max-sm:px-5">
        <div className="flex flex-col max-w-screen-xl w-full py-12">
          <div className="flex justify-between gap-8 mb-12 max-md:flex-wrap">
            <div className="flex flex-col gap-[26px] max-w-[284px]">
              <div className="flex items-center gap-2">
                <div
                  dangerouslySetInnerHTML={{
                    __html: `<svg width="21" height="24" viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.5 0C18.75 0 13.5 1.5 13.5 8.25V13.5C13.5 15.1547 14.8453 16.5 16.5 16.5H18V22.5C18 23.3297 18.6703 24 19.5 24C20.3297 24 21 23.3297 21 22.5V16.5V11.25V1.5C21 0.670312 20.3297 0 19.5 0ZM3 0.75C3 0.365625 2.71406 0.046875 2.32969 0.0046875C1.94531 -0.0375 1.60313 0.215625 1.51875 0.585938L0.0984375 6.975C0.0328125 7.27031 0 7.57031 0 7.87031C0 10.0219 1.64531 11.7891 3.75 11.9813V22.5C3.75 23.3297 4.42031 24 5.25 24C6.07969 24 6.75 23.3297 6.75 22.5V11.9813C8.85469 11.7891 10.5 10.0219 10.5 7.87031C10.5 7.57031 10.4672 7.27031 10.4016 6.975L8.98125 0.585938C8.89688 0.210938 8.54531 -0.0375 8.16562 0.0046875C7.78594 0.046875 7.5 0.365625 7.5 0.75V7.04062C7.5 7.29375 7.29375 7.5 7.04062 7.5C6.80156 7.5 6.60469 7.31719 6.58125 7.07812L5.99531 0.684375C5.9625 0.295313 5.63906 0 5.25 0C4.86094 0 4.5375 0.295313 4.50469 0.684375L3.92344 7.07812C3.9 7.31719 3.70312 7.5 3.46406 7.5C3.21094 7.5 3.00469 7.29375 3.00469 7.04062V0.75H3ZM5.26406 7.875H5.25H5.23594L5.25 7.84219L5.26406 7.875Z" fill="#FF5722"/>
                  </svg>`,
                  }}
                />
                <span className="text-xl font-bold">TasteBuds</span>
              </div>
              <p className="text-base text-gray-600">
                Revolutionizing restaurant operations through smart automation.
              </p>
            </div>
  
            <div className="flex flex-col gap-5">
              <div className="text-lg font-bold">Product</div>
              <ul className="flex flex-col gap-2">
                <li>
                  <a
                    href="#features"
                    className="text-base text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="text-base text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#integration"
                    className="text-base text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Integration
                  </a>
                </li>
              </ul>
            </div>
  
            <div className="flex flex-col gap-5">
              <div className="text-lg font-bold">Company</div>
              <ul className="flex flex-col gap-2">
                <li>
                  <a
                    href="#about"
                    className="text-base text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#blog"
                    className="text-base text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#careers"
                    className="text-base text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Careers
                  </a>
                </li>
              </ul>
            </div>
  
            <div className="flex flex-col gap-5">
              <div className="text-lg font-bold">Connect</div>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.9441 5.92638C17.9568 6.10403 17.9568 6.28173 17.9568 6.45938C17.9568 11.8781 13.8325 18.1218 6.29441 18.1218C3.97207 18.1218 1.81473 17.4492 0 16.2817C0.329961 16.3198 0.647187 16.3325 0.989844 16.3325C2.90605 16.3325 4.67004 15.6853 6.07867 14.5812C4.27664 14.5431 2.76648 13.3629 2.24617 11.7386C2.5 11.7766 2.75379 11.802 3.02031 11.802C3.38832 11.802 3.75637 11.7512 4.09898 11.6624C2.22082 11.2817 0.812148 9.63196 0.812148 7.63958V7.58884C1.35781 7.89341 1.99238 8.08376 2.66492 8.10911C1.56086 7.37306 0.837539 6.11673 0.837539 4.6954C0.837539 3.93399 1.04055 3.23603 1.3959 2.62688C3.41367 5.11419 6.44668 6.73853 9.84766 6.91622C9.78422 6.61165 9.74613 6.29442 9.74613 5.97716C9.74613 3.71825 11.5736 1.87817 13.8451 1.87817C15.0253 1.87817 16.0913 2.3731 16.84 3.17259C17.7664 2.99493 18.6547 2.65228 19.4416 2.18274C19.137 3.13454 18.4898 3.93403 17.6395 4.44161C18.4644 4.35282 19.2639 4.12435 19.9999 3.80712C19.4416 4.61927 18.7436 5.34259 17.9441 5.92638Z"/>
                    </svg>`,
                    }}
                  />
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `<svg width="18" height="20" viewBox="0 0 18 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.25 1.25H1.24609C0.558594 1.25 0 1.81641 0 2.51172V17.4883C0 18.1836 0.558594 18.75 1.24609 18.75H16.25C16.9375 18.75 17.5 18.1836 17.5 17.4883V2.51172C17.5 1.81641 16.9375 1.25 16.25 1.25ZM5.28906 16.25H2.69531V7.89844H5.29297V16.25H5.28906ZM3.99219 6.75781C3.16016 6.75781 2.48828 6.08203 2.48828 5.25391C2.48828 4.42578 3.16016 3.75 3.99219 3.75C4.82031 3.75 5.49609 4.42578 5.49609 5.25391C5.49609 6.08594 4.82422 6.75781 3.99219 6.75781ZM15.0117 16.25H12.418V12.1875C12.418 11.2188 12.3984 9.97266 11.0703 9.97266C9.71875 9.97266 9.51172 11.0273 9.51172 12.1172V16.25H6.91797V7.89844H9.40625V9.03906H9.44141C9.78906 8.38281 10.6367 7.69141 11.8984 7.69141C14.5234 7.69141 15.0117 9.42188 15.0117 11.6719V16.25Z"/>
                    </svg>`,
                    }}
                  />
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `<svg width="21" height="20" viewBox="0 0 21 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.1875 10C20.1875 4.64844 15.8516 0.3125 10.5 0.3125C5.14844 0.3125 0.8125 4.64844 0.8125 10C0.8125 14.8352 4.35508 18.843 8.98633 19.5703V12.8004H6.52539V10H8.98633V7.86562C8.98633 5.43789 10.4316 4.09687 12.6453 4.09687C13.7055 4.09687 14.8141 4.28594 14.8141 4.28594V6.66875H13.5922C12.3891 6.66875 12.0137 7.41562 12.0137 8.18164V10H14.7004L14.2707 12.8004H12.0137V19.5703C16.6449 18.843 20.1875 14.8352 20.1875 10Z"/>
                    </svg>`,
                    }}
                  />
                </a>
              </div>
            </div>
          </div>
  
          <div className="text-base text-gray-600 border-t border-gray-100 pt-[35px]">
            © 2025 TasteBuds. All rights reserved.
          </div>
        </div>
      </footer>
    );
  }
  