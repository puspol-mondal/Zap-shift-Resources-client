import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const serviceCenter = useLoaderData();
  const regionDuplicate = serviceCenter.map((c) => c.region);
  const regions = [...new Set(regionDuplicate)];

  const senderRegion = useWatch({ control, name: "senderRegion" });

  const reciverRegion = useWatch({ control, name: "reciverRegion" });

  const districtByRegion = (region) => {
    const regionDistricts = serviceCenter.filter((c) => c.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  const handelSendParcel = (data) => {
    const isSameDistrict = data.senderDistricts === data.reciverDistricts;
    const isDocument = data.parcelType === "document";
    const parcelWeight = parseFloat(data.parcelWeight);
    let cost = 0;

    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight <= 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;
        cost = minCharge + extraCharge;
      }
    }
    console.log(cost);

    Swal.fire({
      title: "Agree with the Cost?",
      text: `You will be charged! ${cost}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, take it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Swal.fire({
        //   title: "Deleted!",
        //   text: "Your file has been deleted.",
        //   icon: "success",
        // });
        console.log(data);
      }
    });
  };
  return (
    <div>
      <h1>Send A parcel</h1>
      <h3>Enter your parcl details</h3>
      <form onSubmit={handleSubmit(handelSendParcel)} className=" px-5 ">
        {/* parcel type */}
        <div>
          <label className="label mr-3">
            <input
              type="radio"
              value="document"
              className="radio"
              defaultChecked
              {...register("parcelType")}
            />
            Document
          </label>
          <label className="label">
            <input
              type="radio"
              value="non-document"
              className="radio"
              {...register("parcelType")}
            />
            Non Document
          </label>
        </div>
        {/* parcel name and weight */}
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-12">
          <fieldset className="fieldset">
            <label className="label">Parcel Name</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Parcel Name"
              {...register("parcelName")}
            />{" "}
          </fieldset>
          <fieldset className="fieldset">
            <label className="label">Parcel weight (kg)</label>
            <input
              type="number"
              className="input w-full"
              placeholder="Parcel Weight"
              {...register("parcelWeight")}
            />
          </fieldset>
        </div>
        {/**details */}
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-12 mt-5">
          {/**sender details */}
          <fieldset className="fieldset">
            <h4 className=" text-black font-bold text-2xl">Sender Details</h4>
            {/* sender name */}
            <label className="label mt-3">Sender Name</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Sender Name"
              {...register("senderName")}
            />{" "}
            {/* sender email */}
            <label className="label mt-3">Sender Email</label>
            <input
              type="email"
              className="input w-full"
              placeholder="Sender Email"
              {...register("senderEmail")}
            />{" "}
            {/**sender region */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Region</legend>
              <select
                {...register("senderRegion")}
                defaultValue="Pick a browser"
                className="select"
              >
                <option disabled={true}>Pick a region</option>
                {regions.map((r, i) => (
                  <option key={i}>{r}</option>
                ))}
              </select>
            </fieldset>{" "}
            {/**sender districts */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Sender Districts</legend>
              <select
                {...register("senderDistricts")}
                defaultValue="Pick a browser"
                className="select"
              >
                <option disabled={true}>Pick a districts</option>
                {districtByRegion(senderRegion).map((r, i) => (
                  <option key={i}>{r}</option>
                ))}
              </select>
            </fieldset>
            {/* sender Address */}
            <label className="label mt-3">Sender Address</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Sender Address"
              {...register("senderAddress")}
            />{" "}
          </fieldset>
          {/**reciver details */}
          <fieldset className="fieldset">
            <h4 className=" text-black font-bold text-2xl">Reciver Details</h4>
            {/* Reciver Name */}
            <label className="label mt-3">Reciver Name</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Reciver Name"
              {...register("reciverName")}
            />{" "}
            {/* Reciver email */}
            <label className="label mt-3">Reciver Email</label>
            <input
              type="email"
              className="input w-full"
              placeholder="Reciver Email"
              {...register("reciverEmail")}
            />{" "}
            {/* Reciver Region */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Reciver Region</legend>
              <select
                {...register("reciverRegion")}
                defaultValue="Pick a Region"
                className="select"
              >
                <option disabled={true}>Pick a region</option>
                {regions.map((r, i) => (
                  <option key={i}>{r}</option>
                ))}
              </select>
            </fieldset>{" "}
            {/**Reciver districts */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Reciver Districts</legend>
              <select
                {...register("reciverDistricts")}
                defaultValue="Pick a browser"
                className="select"
              >
                <option disabled={true}>Pick a districts</option>
                {districtByRegion(reciverRegion).map((r, i) => (
                  <option key={i}>{r}</option>
                ))}
              </select>
            </fieldset>
            {/* Reciver Address */}
            <label className="label mt-3">Reciver Address</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Reciver Address"
              {...register("reciverAddress")}
            />{" "}
          </fieldset>
        </div>

        <input
          type="submit"
          className="btn btn-primary text-black mt-5"
          value={"Send a parcel"}
        />
      </form>
    </div>
  );
};

export default SendParcel;
