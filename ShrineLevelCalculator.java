package com.girladrift;

import java.util.HashMap;
import java.util.Map;

public class ShrineLevelCalculator implements ICalculator {
    private static final int MAX_SHRINE_LEVEL = 10;

    @Override
    public CalculationResult calculate(UserInput input) {
        int currentLevel = input.shrineLevels.getOrDefault(input.selectedShrine, 0);
        int targetLevel = MAX_SHRINE_LEVEL;
        int totalAmber = 0;

        for (int i = currentLevel + 1; i <= targetLevel; i++) {
            totalAmber += i * 20;
        }

        Map<String, Integer> materials = new HashMap<>();
        materials.put("호박석", totalAmber);

        CalculationResult result = new CalculationResult();
        result.totalCost = totalAmber * 50;
        result.requiredMaterials = materials;
        result.message = input.selectedShrine + " 신단 레벨업 완료";
        return result;
    }
}