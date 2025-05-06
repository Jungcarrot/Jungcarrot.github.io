package com.girladrift;

import java.util.HashMap;
import java.util.Map;

public class FarmLevelCalculator implements ICalculator {
    private static final int MAX_LEVEL = 10;

    @Override
    public CalculationResult calculate(UserInput input) {
        Map<String, Integer> materials = new HashMap<>();
        int totalCost = 0;

        for (Map.Entry<String, Integer> entry : input.farmSkinLevels.entrySet()) {
            int current = entry.getValue();
            int target = Math.min(input.farmTargetLevel, MAX_LEVEL);

            for (int lv = current + 1; lv <= target; lv++) {
                materials.merge("재료A", 10, Integer::sum);
                totalCost += 100 * lv;
            }
        }

        CalculationResult result = new CalculationResult();
        result.totalCost = totalCost;
        result.requiredMaterials = materials;
        result.message = "농장 스킨 레벨업 계산 완료";
        return result;
    }
}