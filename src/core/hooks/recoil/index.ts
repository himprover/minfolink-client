import produce from 'immer';
import {ChangeEvent} from 'react';
import {SetterOrUpdater} from 'recoil';

type ImmerSetter = (value: any) => void;
type InputImmerSetter = (event: ChangeEvent<HTMLInputElement>) => void;
type CheckboxImmerSetter = () => void;

export const useSetterWithRecoilImmer = (
  setter: SetterOrUpdater<any>,
  name: string
): ImmerSetter => {
  const immerSetter = (value: any) => {
    setter((prev: any) =>
      produce(prev, (draft: any) => {
        draft[name] = value;
        return draft;
      })
    );
  };
  return immerSetter;
};

export const useInputHandlerWithRecoilImmer = (
  setter: SetterOrUpdater<any>,
  name: string
): InputImmerSetter => {
  const inputImmerSetter = ({target}: ChangeEvent<HTMLInputElement>) => {
    setter((prev: any) =>
      produce(prev, (draft: any) => {
        draft[name] = target.value;
        return draft;
      })
    );
  };
  return inputImmerSetter;
};

export const useCheckboxHandlerWithRecoilImmer = (
  setter: SetterOrUpdater<any>,
  name: string
): CheckboxImmerSetter => {
  const inputImmerSetter = () => {
    setter((prev: any) =>
      produce(prev, (draft: any) => {
        draft[name] = !draft[name];
        return draft;
      })
    );
  };
  return inputImmerSetter;
};
