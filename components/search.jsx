import {css} from "@emotion/react";
import SearchIcon from '@mui/icons-material/Search';

export function SearchBox({className, style}) {
    return <div css={css`border: 1px solid #ced4da;
      border-radius: .25rem;
      display: flex;
      align-items: center;
      background: var(--primary-white);
    `} className={className} style={style}>
        <SearchIcon className="mx-2"/>
        <input css={css`border: none;
          padding: .6rem .75rem;
          font-weight: 300;
          line-height: 1.5;
          color: var(--primary-input);
          background: transparent;
          width: 100%;

          &:focus {
            outline: none;
          }`} type="text" placeholder="نام کالا را وارد کنید"/>
    </div>;
}