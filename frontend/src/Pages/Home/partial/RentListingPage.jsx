import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../../libs/axios";
import ListingItem from "../../../Components/card";
import { Link } from "react-router-dom";

function RentListingPage() {
  const [rentListing, setRentListing] = useState([]);

  useEffect(() => {
    fetchRentData();
  }, []);

  const fetchRentData = async () => {
    try {
      let res = await axiosInstance.get("/searchListing/?type=rent&limit=3");
      setRentListing(res.data.listing);
    } catch (error) {
      console.log("internal error: " + error);
    }
  };

  return (
    <div>
      {rentListing?.length > 0 && (
        <div>
          <div className="my-3 ">
            <h2 className="text-2xl font-serif text-[#843250]">
              Recent Places for Rent
            </h2>
            <Link
              className="text-sm font-serif text-[#843250] hover-underline-animation"
              to={"/search?type=rent"}
            >
              Show more Places for Rent
            </Link>
          </div>

          <div className="flex flex-wrap gap-4">
            {rentListing?.map((listing) => (
              <ListingItem listing={listing} key={listing._id} />
            ))}
            {/* {adminrentListing && adminrentListing.length > 0 && (
              <div className="flex flex-wrap gap-4">
                {adminrentListing.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            )} */}
          </div>
        </div>
      )}
    </div>
  );
}

export default RentListingPage;
