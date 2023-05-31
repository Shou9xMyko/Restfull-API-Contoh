const getData = (Status_Code, Data, Message, res) => {
  res.status(Status_Code).json({
    payload: {
      status_Code: Status_Code,
      datas: Data,
      message: Message,
    },
    pagination: {
      prev: "",
      next: "",
      max: "",
    },
  });
};

module.exports = getData;
