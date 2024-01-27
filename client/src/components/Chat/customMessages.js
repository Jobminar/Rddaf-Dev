import React from "react";

const customMessages = {
  Sell: () =>
    "What kind of property do you want to sell, commercial or residential?",
  Tolet: () =>
    "What kind of property do you want to sell, commercial or residential?",
  Yes: () => (
    <React.Fragment>
      Certainly! Here are some options:
      <ul>
        <li>Report an Issue with Sale</li>
        <li>Explore Renting or Letting a Property</li>
        <li>Property Management</li>
        <li>Resolve Website or Profile Issues</li>
        <li>Connect with our Agent</li>
      </ul>
    </React.Fragment>
  ),
  "Hi ": () => (
    <React.Fragment>
      Report an Issue with Sale Explore Renting or Letting a Property Property
      Management Resolve Website or Profile Issues Connect with our Agent
    </React.Fragment>
  ),
  " ": () => (
    <React.Fragment>
      Report an Issue with Sale Explore Renting or Letting a Property Property
      Management Resolve Website or Profile Issues Connect with our Agent
    </React.Fragment>
  ),
  Greeting: () => (
    <React.Fragment>
      Report an Issue with Sale Explore Renting or Letting a Property Property
      Management Resolve Website or Profile Issues Connect with our Agent
    </React.Fragment>
  ),
  GreetingOptions: () => (
    <React.Fragment>
      Report an Issue with Sale Explore Renting or Letting a Property Property
      Management Resolve Website or Profile Issues Connect with our Agent
    </React.Fragment>
  ),
  IdentifyRole: () => (
    <React.Fragment>
      Greetings! Are you looking to buy, sell, or rent a property, or perhaps
      you're a tenant facing issues with your current property? Let me know so I
      can guide you accordingly.
    </React.Fragment>
  ),
  BuyerSellerOptions: () => (
    <React.Fragment>
      Hello! If you're interested in buying or selling, here are some options
      for you:
      <ul>
        <li>Report an Issue with Sale</li>
        <li>Explore Renting or Letting a Property</li>
        <li>Property Management</li>
        <li>Resolve Website or Profile Issues</li>
        <li>Connect with our Agent</li>
      </ul>
    </React.Fragment>
  ),
  TenantOptions: () => (
    <React.Fragment>
      Hi there! If you're a tenant, here are some ways I can assist you:
      <ul>
        <li>Address Agreement Issues</li>
        <li>Handle Repairs</li>
        <li>Resolve Billing Issues</li>
        <li>Connect with our Agent</li>
      </ul>
    </React.Fragment>
  ),
  IssueInSale: () =>
    "Certainly! To assist you better, could you provide more details on why you want to revert the listing request for your property?",
  RentLettedProperty: () =>
    "Sure thing! Is the issue related to a property you currently own or one you want to rent out? Provide more details so I can guide you appropriately.",
  LetLettingProperty: () =>
    "Absolutely! To get started, please share more information about the property you're interested in letting, such as location, type, and any specific requirements.",
  WebsiteProfileIssue: () =>
    "Of course! I'm here to help. Could you please describe in detail the issue you're experiencing with the website or your profile?",
  AgreementIssue: () =>
    "Understood. To better assist you, could you specify which part of the agreement is causing concern? This will help me provide more accurate guidance.",
  Repairs: () =>
    "Got it! Understanding the type of repair needed is crucial. Could you please provide more details about the specific repair or issue you're facing?",
  BillingIssue: () =>
    "Certainly! To address the billing concern effectively, please explain the details of the issue you're experiencing. This will help us resolve it promptly.",
  SendFeedback: () =>
    "We value your feedback! To send feedback, please provide your contact information and additional details. Our dedicated agent (Landlord/Zone Agent) will reach out to you.",
  End: () =>
    "Thank you for your feedback! Your input has been received, and our agent will be in touch with you soon. Have a wonderful day!",
  Unknown: () =>
    "I didn't quite catch that. Could you please rephrase or provide more details about your request? Your clarification will help me assist you more effectively.",
  default: () =>
    "I'm sorry, I didn't understand that. Can you please rephrase or provide more information? Your input is crucial for me to assist you better.",
};

export default customMessages;
