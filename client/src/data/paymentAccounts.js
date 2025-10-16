export const paymentAccounts = [
  {
    id: "1",
    accountName: "Mentor Health Primary Account",
    bank: "Habib Bank Limited",
    branch: "Blue Area Branch",
    iban: "PK36HABB0023456789012345",
    currency: "PKR",
    gatewayLinked: "Stripe",
    status: "Active",
    notes: "Primary account for all Mentor Health transactions"
  },
  {
    id: "2", 
    accountName: "Mentor Health USD Account",
    bank: "Standard Chartered Bank",
    branch: "I-8 Branch",
    iban: "PK42SCBL0000000123456789",
    currency: "USD",
    gatewayLinked: "PayPal",
    status: "Inactive",
    notes: "USD account for international transactions"
  }
];
