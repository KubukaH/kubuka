import { useState, useEffect } from "react";

import useLoading from "../load";
import { useInput } from "../hooks/useInput";
import { alertService } from "../../alert/service";
import RefreshingIcon from "../refresh";

const encode = (data) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

const SendMessage = () => {
  const [isLoading, load] = useLoading();

  const email = useInput('');
  const names = useInput('');
  const message = useInput('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alertService.clear();

    if(!email.value || !names.value || !message.value) {
      alertService.error("Blank fields detected!");
      return;
    }

    load(
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "contactus", Names: names.value, Email: email.value, Message: message.value })
      }))
      .then(() => {
        alertService.success("Message sent to Admins!");
        email.value = "", names.value = "", message.value = "";
      })
      .catch(error => alertService.error(error));
  };

  return (
    <section className="relative block py-24 lg:pt-0 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center lg:-mt-64 -mt-48">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300">
              <div className="flex-auto p-5 lg:p-10">
                <h4 className="text-2xl font-semibold">
                  Want to reach us for more?
                </h4>
                <p className="leading-relaxed mt-1 mb-4 text-gray-600">
                  Complete this form and we will get back to you in 24 hours.
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="flex w-full items-end gap-4 mb-4">
                    <input
                      type="text"
                      {...names.bind}
                      className={
                        `border-0 peer px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full`
                      }
                      placeholder="Names"
                    />
                    <input
                      type="email"
                      {...email.bind}
                      className={
                        `border-0 peer px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full`
                      }
                      placeholder="Email"
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <textarea
                      {...message.bind}
                      className="textarea textarea-accent w-full"
                      placeholder="Type a message..."
                    ></textarea>
                  </div>
                  <div className="flex items-end text-center mt-6">
                    <button
                      className="btn btn-success bg-green-400 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                      type="submit"
                      style={{ transition: "all .15s ease" }}
                      size="md"
                    >
                      Send Message
                      {isLoading && (
                        <RefreshingIcon />
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SendMessage;