package com.girladrift;

import java.util.Map;

public class AttackPowerCalculator implements ICalculator {
    @Override
    public CalculationResult calculate(UserInput input) {
        double baseDamage = input.playerLevel * 5;
        double petBonus = input.petLevel * 1.2;
        double weaponDamage = 0;

        for (Map.Entry<String, Integer> entry : input.weaponLevels.entrySet()) {
            String weapon = entry.getKey();
            int level = entry.getValue();
            double buff = input.weaponSkinBuffs.getOrDefault(weapon, 0.0);

            weaponDamage += level * 10 * (1 + buff / 100);
        }

        double totalDamage = baseDamage + petBonus + weaponDamage;

        CalculationResult result = new CalculationResult();
        result.finalAttackPower = totalDamage;
        result.message = "공격력 계산 완료";
        return result;
    }
}