export const getBadge = (points) => {

  if (points >= 500)
    return "Food Guardian";

  if (points >= 250)
    return "Eco Champion";

  if (points >= 100)
    return "Waste Warrior";

  return "Beginner";
};