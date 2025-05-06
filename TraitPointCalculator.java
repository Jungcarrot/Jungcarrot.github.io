package com.girladrift;

import java.util.HashMap;
import java.util.Map;

public class TraitPointCalculator implements ICalculator {
    private static final Map<String, Integer> maxTraitLevels = Map.of(
        "힘", 10, "지능", 15, "행운", 20, "속도", 12,
        "방어", 8, "체력", 25, "회복", 18, "치명타", 10,
        "정신력", 10, "운영력", 10
    );

    @Override
    public CalculationResult calculate(UserInput input) {
        Map<String, Integer> resultMap = new HashMap<>();
        int totalPointsUsed = 0;

        for (Map.Entry<String, Integer> entry : input.traitLevels.entrySet()) {
            String trait = entry.getKey();
            int level = Math.min(entry.getValue(), maxTraitLevels.getOrDefault(trait, 10));
            resultMap.put(trait, level);
            totalPointsUsed += level;
        }

        CalculationResult result = new CalculationResult();
        result.requiredMaterials = resultMap;
        result.totalCost = totalPointsUsed * 100;
        result.message = "특성 포인트 계산 완료";
        return result;
    }
}