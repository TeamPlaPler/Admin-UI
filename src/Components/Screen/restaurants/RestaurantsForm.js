import React, { useEffect, useState } from "react";
import { Button, Steps, theme, Spin } from "antd";
import "react-quill/dist/quill.snow.css";
import { postrestaurantsData, putrestaurants } from "./RestaurantsService";
import {
  failedNotification,
  successNotification,
} from "../../ReusableComp/Notifications";
import Step1 from "./form/Step1";
import Step2 from "./form/Step2";
import Step3 from "./form/Step3";

const RestaurantsForm = (props) => {
  const [isEdit] = useState(props.isEdit);
  // props.formData
  const [loading, setLoading] = useState(false);

  const [step1Data, setStep1Data] = useState(props.formData);
  const [step2Data, setStep2Data] = useState(props.formData);
  const [step3Data, setStep3Data] = useState(props.formData);

  useEffect(() => {
    console.log(step1Data);
    console.log(step2Data);
    console.log(step3Data);
  }, [step1Data, step2Data, step3Data]);

  const next = () => {
    setCurrent(current + 1);
  };
  const Submit = () => {
    console.log(step1Data);
    console.log(step2Data);
    console.log(step3Data);
    onFinish({ ...step1Data, ...step2Data, ...step3Data });
  };

  const steps = [
    {
      title: "First",
      content: (
        <Step1 formData={step1Data} onDataUpdate={setStep1Data} goNext={next} />
      ),
    },
    {
      title: "Second",
      content: (
        <Step2 formData={step2Data} onDataUpdate={setStep2Data} goNext={next} />
      ),
    },
    {
      title: "Last",
      content: (
        <Step3
          formData={step3Data}
          onDataUpdate={setStep3Data}
          goNext={Submit}
        />
      ),
    },
  ];

  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const contentStyle = {
    lineHeight: "260px",
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  const onFinish = (value) => {
    setLoading(true);

    if (isEdit) {
      let payLoad = {
        createdBy: "jaya krishna ",
        createdAt: "2014-12-24 23:12:00",
        updatedBy: "jashwant ",
        updatedAt: "2014-12-24 23:12:00",
      };

      putrestaurants(props.formData._id, {
        ...value,
        ...payLoad,
        _id: props.formData._id,
      })
        .then((data) => {
          setLoading(false);
          successNotification("Data updated for " + value.title);
          props.closeDrawer();
        })
        .catch((error) => {
          // alert("sometihing went wrong..!");
          failedNotification(error);
          setLoading(false);
        });
    } else {
      let payLoad = {
        createdBy: "jaya krishna ",
        createdAt: "2014-12-24 23:12:00",
        updatedBy: "",
        updatedAt: "",
      };

      postrestaurantsData({
        ...value,
        ...payLoad,
      })
        .then((data) => {
          setLoading(false);
          successNotification("Form submitted for " + value.title);
          props.closeDrawer();
        })
        .catch((error) => {
          // alert("sometihing went wrong..!");
          failedNotification(error);
          setLoading(false);
        });
    }
  };
  // const onFinishFailed = () => {
  //   failedNotification("Fill all required fileds ");
  // };

  return (
    <>
      <Spin spinning={loading} delay={500}>
        <Steps current={current} items={items} />
        <div style={contentStyle}>{steps[current].content}</div>
        <div
          style={{
            marginTop: 24,
          }}
        >
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              temp Next
            </Button>
          )}
          {current > 0 && (
            <Button
              style={{
                margin: "0 8px",
              }}
              onClick={() => prev()}
            >
              Previous
            </Button>
          )}
        </div>

        <Button type="primary" onClick={() => Submit()}>
          Submit
        </Button>
      </Spin>
    </>
  );
};
export default RestaurantsForm;
