import React from 'react'

const PrivacyPolicyDetails = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-8 md:p-12 lg:p-20 py-[4rem]">
      <div className="max-w-8xl mx-auto bg-white shadow-lg rounded-lg p-6 md:p-10 lg:p-12">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
          Privacy Policy
        </h1>
        <p className="text-gray-600 mb-4">
          Workason Ltd complies with UK GDPR and the Data Protection Act 2018. We collect and process personal data such as names, emails, phone numbers, freelancer profiles, employer details, cookies, and payment information.
          <br />
Your Rights:
You may access, update, or delete your data at any time by contacting contact@workason.com.

        </p>
        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-3">
            What Does This Notice Cover?
          </h2>
          <p className="text-gray-600">
            Privacy data stresses how your information is collected, stored, and
            processed, and it also explains your rights under the law relating
            to your data.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-3">
            What is Personal Data?
          </h2>
          <p className="text-gray-600">
            Personal data consists of your name, contact details, statements of
            accounts, e.t.c, and we will conceal them from third parties.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-3">
            What Are My Rights?
          </h2>
          <ul className="list-disc list-inside text-gray-600">
            <li className="mb-2">
              The right to inform you about the use of your data and you can
              withdraw your information anytime you wish.
            </li>
            <li className="mb-2">
              The right to access the personal data we hold about you at any
              time.
            </li>
            <li className="mb-2">
              The right to have your data updated at any time.
            </li>
            <li>
              The right to inform us to delete all your information from our
              system.
            </li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-3">
            How Do You Collect or Obtain Personal Data?
          </h2>
          <p className="text-gray-600">
            You will be responsible for providing us with all the data necessary
            to execute your work, or you can permit us to access shared
            electronic resources such as accounting software.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-3">
            Do You Share My Data?
          </h2>
          <p className="text-gray-600">
            We will never share your data with random people apart from
            employers who will review your profile for possible employment.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-3">
            How Do I Contact You?
          </h2>
          <p className="text-gray-600">
            Contact us via our contact form, email address, or phone number.
          </p>
        </section>
        <p className="text-gray-600">
          We may change this Privacy Notice at any time, and we will communicate
          such changes via our website.
        </p>
      </div>
    </div>
  )
}

export default PrivacyPolicyDetails