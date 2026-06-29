import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import type { Order } from "../types";
import { dummyDashboardOrdersData } from "../assets/assets";

const OrderTracking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  const [liveLocation, setLiveLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    setOrder(dummyDashboardOrdersData.find((o) => o._id === id) as any);
  }, [id, navigate]);

  return <div className="">OrderTracking</div>;
};

export default OrderTracking;
