import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../../libs/axios";
import ListingItem from "../../../Components/card";
import { Link } from "react-router-dom";

function SaleListingPage() {
  const [saleListing, setSaleListing] = useState([]);

  useEffect(() => {
    fetchSaleData();
  }, []);

  const fetchSaleData = async () => {
    try {
      let res = await axiosInstance.get("/searchListing/?type=sale&limit=3");
      setSaleListing(res.data.listing);
    } catch (error) {
      console.log("internal error: " + error);
    }
  };

  return (
    <div>
      {saleListing?.length > 0 && (
        <div>
          <div className="my-3 ">
            <h2 className="text-2xl font-serif text-[#843250]">
              Recent Places for Sale
            </h2>
            <Link
              className="text-sm font-serif text-[#843250] hover-underline-animation"
              to={"/search?type=sale"}
            >
              Show more Places for Sale
            </Link>
          </div>

          <div className="flex flex-wrap gap-4 ">
            {saleListing?.map((listing) => (
              <ListingItem listing={listing} key={listing._id} />
            ))}
            {/* {adminsaleListing && adminsaleListing.length > 0 && (
                <div className="flex flex-wrap gap-4">
                  {adminsaleListing.map((listing) => (
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

export default SaleListingPage;
