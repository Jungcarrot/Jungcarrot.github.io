package com.girladrift;

public class CalculatorFactory {
    public static ICalculator getCalculator(String type) {
        return switch (type) {
            case "farm" -> new FarmLevelCalculator();
            case "attack" -> new AttackPowerCalculator();
            case "shrine" -> new ShrineLevelCalculator();
            case "trait" -> new TraitPointCalculator();
            default -> throw new IllegalArgumentException("Invalid calculator type");
        };
    }
}