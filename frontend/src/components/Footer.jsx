import React from "react";

const Footer = () => {
  return (
    <div>
      <footer class="bg-gray-100 py-6 border-t border-gray-300">
        <div class="max-w-screen-xl mx-auto text-center">
          <p class="text-sm text-gray-700">
            &copy; 2024 Hungry Stomachs- A Chocolate Shop. All rights reserved.
          </p>
          <p class="mt-2 text-xs text-gray-600">
            <a href="/privacy-policy" class="text-blue-500 hover:underline">
              Privacy Policy
            </a>{" "}
            |
            <a href="/terms-of-service" class="text-blue-500 hover:underline">
              Terms of Service
            </a>
          </p>
          <p class="mt-2 text-xs text-gray-600">
            Follow us on {" "}
            <a
              href="https://facebook.com"
              target="_blank"
              class="text-blue-500 hover:underline"
            >
              Facebook
            </a>
            ,{" "}
            <a
              href="https://instagram.com"
              target="_blank"
              class="text-blue-500 hover:underline"
            >
              Instagram
            </a>
            , and{" "}
            <a
              href="https://twitter.com"
              target="_blank"
              class="text-blue-500 hover:underline"
            >
              Twitter
            </a>
            .
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
