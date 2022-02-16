import React, { useRef, useState } from "react";
import {
  Bar,
  getElementAtEvent,
  getElementsAtEvent,
  getDatasetAtEvent,
} from "react-chartjs-2";
import Chart from "chart.js/auto";
import arr from "../data/ChartData";
import { Modal, TextContainer } from "@shopify/polaris";

const BarChart1 = () => {
  const [active, setActive] = useState(false);
  const [userName, setUserName] = useState("");

  const chartRef = useRef();

  const chartLabels = arr.map((data) => data.users);
  const shippedDatas = arr.map((data) => data.shipped && data.shipped);
  const pendingDatas = arr.map((data) => data.pending && data.pending);
  const failedDatas = arr.map((data) => data.failed && data.failed);

  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: "Shipped",
        data: shippedDatas,
        backgroundColor: "rgba(201, 71, 237)",
      },
      {
        label: "Pending",
        data: pendingDatas,
        backgroundColor: "rgba(109, 190, 214)",
      },
      {
        label: "Failed",
        data: failedDatas,
        backgroundColor: "rgba(183, 120, 204)",
      },
    ],
  };

  const printDatasetAtEvent = (element) => {
    // setActive(false);
    if (!element.length) return;
    console.log(element);
    // console.log(element[0]);
    const { datasetIndex, index } = element[0];
    setUserName(
      `UserName: ${data.labels[index]}, ${data.datasets[datasetIndex].label}: ${data.datasets[datasetIndex].data[index]}`
    );
    return { active, userName };
  };

  const clickHandle = (event) => {
    printDatasetAtEvent(getElementAtEvent(chartRef.current, event));
    // console.log(getElementAtEvent(chartRef.current, event));
    const el = getElementsAtEvent(chartRef.current, event);
    console.log(el);
    console.log(getDatasetAtEvent(chartRef.current, event));
  };

  const activator = (
    <Bar
      data={data}
      height={250}
      width={600}
      options={
        ({ maintainAspectRatio: false },
        {
          scales: {
            x: {
              beginAtZero: true,
            },
          },
        },
        { onClick: () => setActive(true) })
      }
      ref={chartRef}
      onClick={clickHandle}
    />
  );

  // var employeeDetailsOriginal = {
  //   name: "Rizwan",
  //   age: 25,
  //   Profession: "Software Engineer",
  // };
  // var employeeDetailsDuplicate = { ...employeeDetailsOriginal };
  // employeeDetailsDuplicate.name = "NameChanged";
  // console.log(employeeDetailsDuplicate);
  // console.log(employeeDetailsOriginal);

  return (
    <div style={{ height: "500px" }}>
      <Modal
        activator={activator}
        open={active}
        onClose={() => setActive(false)}
        title="User Details"
        // primaryAction={{
        //   content: "Add Instagram",
        //   onAction: { clickHandle },
        // }}
        secondaryActions={[
          {
            content: "Learn more",
            onAction: { clickHandle },
          },
        ]}
        large={true}
      >
        <Modal.Section>
          <TextContainer>
            <p>
              {userName === ""
                ? "No user selected, please select a user to check details"
                : userName}
            </p>
          </TextContainer>
        </Modal.Section>
      </Modal>
    </div>
  );
};

export default BarChart1;
