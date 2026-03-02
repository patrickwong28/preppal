"use client";

import { motion } from "framer-motion";
import MealCard from "./MealCard";
import { Meal } from "@/utils/types";

const MealContainer = ({ meals }: { meals: Meal[] }) => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 items-stretch justify-items-center gap-8 mt-8 ">
      {meals.map((meal, index) => (
        <motion.div
          key={meal.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          layout
        >
          <MealCard key={index} meal={meal} showSaveButton={true} />
        </motion.div>
      ))}
    </section>
  );
};

export default MealContainer;
