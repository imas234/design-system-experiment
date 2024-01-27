import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { 
    DataGrid,
    DataGridProps, 
    GridColDef,
    GridValueGetterParams,
    GridRow,
    useGridApiRef,
    GridCellParams, 
    GridRowProps, 
    GridSlotsComponentsProps,
    GridColumnsState,
    GridRowId,
    GridCellProps,
    GridCell,
    GridCellModesModel,
} from '@mui/x-data-grid';
import { useTheme } from '../../theme/ThemeContext';
import { ThemeTextColor, BodySize, HeadingSize } from '../Typography'

type CustomProps = {
    treeData?: boolean,
    multiCellSelect?: boolean,
    rowFontSize?: BodySize,
    rowTextColor?: ThemeTextColor,
}

type Props = DataGridProps & CustomProps;

const useShiftEvent = () => {
    const [isShiftPressed, setIsShiftPressed] = useState(true);

    useEffect(() => {
        const isShiftUnpressed = () => {
            setIsShiftPressed(false);
        };

        const isShiftPressedDown = (e: KeyboardEvent) => {
            setIsShiftPressed(e.shiftKey);
        };

        document.addEventListener('keydown', isShiftPressedDown);
        document.addEventListener('keyup', isShiftUnpressed);

        return () => {
            document.removeEventListener('keydown', isShiftPressedDown);
            document.removeEventListener('keyup', isShiftUnpressed)
        }
    }, []);

    return isShiftPressed;
}

const DataGridExtended = (props: Props) => {
    const theme = useTheme();
    const [idsSelected, setIdsSelected] = useState<{[key: string]: boolean}>({});
    const apiRef = useGridApiRef();
    const isShiftPressed = useShiftEvent();

    return (
        <DataGrid
            {...props}
            slots={{
                row: (gridRowProps: GridRowProps) => {    
                    return (
                        <GridRow 
                            {...gridRowProps} 
                            style={{
                                fontSize: `${props.rowFontSize ?? theme.typography.body.xs}rem`,
                                color: props.rowTextColor ?? theme.color.text.primary,
                            }} />
                    );
                },
                cell: (cellProps: GridCellProps) => {
                    return (
                        <GridCell  
                            {...cellProps}
                            isSelected={idsSelected[`${cellProps.rowId}-${cellProps.field}`]}
                        />
                    );
                }
            }}
            onCellClick={(params) => {
                if (isShiftPressed) {
                    setIdsSelected((idsSelected) => {
                        return ({...idsSelected, [`${params.id}-${params.field}`]: true});
                    });
                }
                else {
                    setIdsSelected({});
                }
            }}
            rowSelection={!!props.multiCellSelect}
            apiRef={apiRef}
        />
    );
}

const AdvancedDataGridWithTreeData = (props: Props) => {
    const apiRef = useGridApiRef();

    return (
        <DataGridExtended
            {...props}
            apiRef={apiRef}
        />
    )
}

export const AdvancedDataGrid = (props: Props) => {
    if (props.treeData) {
        return React.createElement(AdvancedDataGridWithTreeData, props, null);
    }

    return React.createElement(DataGridExtended, props, null);
};

export type {
    Props,
    GridColDef,
    GridCellParams,
    GridValueGetterParams,
    DataGrid,
    DataGridProps, 
    GridRow,
    useGridApiRef,
    GridRowProps, 
    GridSlotsComponentsProps,
    GridColumnsState,
    GridRowId,
    GridCellProps,
    GridCell,
    GridCellModesModel,
}