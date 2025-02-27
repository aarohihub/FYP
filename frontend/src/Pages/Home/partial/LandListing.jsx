import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../../libs/axios";
import ListingItem from "../../../Components/card";
import { Link } from "react-router-dom";

function LandListingPage() {
  const [landListing, setLandListing] = useState([]);

  useEffect(() => {
    fetchLandData();
  }, []);

  const fetchLandData = async () => {
    try {
      let res = await axiosInstance("/searchListing/?type=land&limit=3");
      setLandListing(res.data.listing);
    } catch (error) {
      console.log("internal error: " + error);
    }
  };
  return (
    <div>
      {landListing && landListing.length > 0 && (
        <div>
          <div className="my-3 ">
            <h2 className="text-2xl font-serif text-[#843250] ">
              Recent Places for Land
            </h2>
            <Link
              className="text-sm font-serif text-[#843250] hover-underline-animation"
              to={"/search?type=land"}
            >
              Show more Places for Land
            </Link>
          </div>

          <div className="flex flex-wrap gap-4">
            {landListing.map((listing) => (
              <ListingItem listing={listing} key={listing._id} />
            ))}
            {/* {adminlandListing && adminlandListing.length > 0 && (
              <div className="flex flex-wrap gap-4">
                {adminlandListing.map((listing) => (
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

export default LandListingPage;
