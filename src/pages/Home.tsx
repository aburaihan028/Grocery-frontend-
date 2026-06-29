import AppPromoBanner from "../components/homeComponent/AppPromoBanner";
import Features from "../components/homeComponent/Features";
import Hero from "../components/homeComponent/Hero";
import HomeCategories from "../components/homeComponent/HomeCategories";
import Newsletter from "../components/homeComponent/Newsletter";
import PopularProducts from "../components/homeComponent/PopularProducts";

const Home = () => {
  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Hero />
      <Features />
      <HomeCategories />
      <PopularProducts />
      <AppPromoBanner />
      <Newsletter />
    </div>
  );
};

export default Home;
