import React from "react";
import { useForm } from "react-hook-form";
import { IconInput } from "./IconInput";

export const BillingForm = ({ setBillingInfo }) => {
  const { register, handleSubmit, watch } = useForm();

  const updateInfo = () => {
    const formValues = watch();
    setBillingInfo(formValues);
  };

  return (
    <form className="shadow bg-white p-6 rounded-lg" onChange={updateInfo}>
      <h2 className="text-xl font-semibold text-black mb-6">
        Billing & Contact Information
      </h2>
      <div className="grid grid-cols-2 gap-6 max-sm:grid-cols-1">
        <IconInput {...register("fullName")}  icon={
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            ></svg>} type="text" placeholder="Full Name" />
        <IconInput {...register("email")}icon={
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            ></svg>} type="email" placeholder="Email" />
        <IconInput icon={
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            ></svg>}{...register("phone")} type="text" placeholder="Phone" />
        <IconInput icon={
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            ></svg>} {...register("street")} type="text" placeholder="Street Address" />
        <IconInput  icon={
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            ></svg>} {...register("city")} type="text" placeholder="City" />
        <IconInput icon={
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            ></svg>}{...register("state")} type="text" placeholder="State" />
        <IconInput icon={
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            ></svg>}{...register("zipcode")} type="text" placeholder="Zip Code" />
        <IconInput icon={
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            ></svg>}{...register("country")} type="text" placeholder="Country" />
      </div>
    </form>
  );
};
