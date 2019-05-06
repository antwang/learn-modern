module.exports = {
  code: 0,
  message: "success",
  data: {
    name: "@cname",
    mobile: /^1[385]\d{9}$/,
    "age|18-50": 1,
    "orders|5-10": [
      {
        id: "@id",
        from: "@county(true)",
        to: "@county(true)"
      }
    ]
  }
};
